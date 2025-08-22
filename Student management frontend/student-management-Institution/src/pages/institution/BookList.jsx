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
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
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
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setBooks(books.filter((book) => book.id !== id));
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Failed to delete book");
      }
    }
  };

  if (loading) return <p className="text-center">⏳ Loading books...</p>;
  if (error)
    return (
      <p className="text-center text-red-600 font-semibold">
        ❌ {error}
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white shadow p-6 rounded-md">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">📚 Book List</h2>

      {books.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border p-2">#</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">ISBN</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Added Date</th>
              <th className="border p-2">Copies</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{book.title}</td>
                <td className="border p-2">{book.author}</td>
                <td className="border p-2">{book.isbn}</td>
                <td className="border p-2">{book.category || "—"}</td>
                <td className="border p-2">{book.added_on || "—"}</td>
                <td className="border p-2">{book.quantity}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookList;
