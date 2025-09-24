import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/collegeapp/books/",
        { headers: { Authorization: `Token ${token}` } }
      );
      setBooks(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://127.0.0.1:8000/collegeapp/books/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setBooks(books.filter((book) => book.id !== id));
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Failed to delete book");
      }
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">⏳ Loading books...</p>;
  if (error) return <p className="text-center mt-10 text-red-600 font-semibold">❌ {error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">📚 Book List</h2>

      {books.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid gap-6">
          {books.map((book, index) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex justify-between items-center hover:shadow-xl transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-blue-700">{book.title}</h3>
                <p className="text-gray-600">
                  Author: {book.author} | ISBN: {book.isbn}
                </p>
                <p className="text-gray-600">
                  Category: {book.category || "—"} | Copies: {book.quantity}
                </p>
                <p className="text-gray-400 text-sm">Added: {book.added_on || "—"}</p>
              </div>
              <div>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;

