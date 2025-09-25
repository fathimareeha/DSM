import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:8000/schoolapp/bookcreate/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://127.0.0.1:8000/schoolapp/bookdetail/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setBooks(books.filter((book) => book.id !== id));
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-indigo-800 mb-6 border-b pb-2">
        Manage Books
      </h2>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-base text-left border-collapse">
          <thead className="bg-indigo-600 text-white text-lg">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">ISBN</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
<tbody>
  {books.length > 0 ? (
    books.map((book, index) => (
      <tr
        key={book.id}
        className={`${
          index % 2 === 0 ? "bg-gray-50" : "bg-white"
        } hover:bg-indigo-50 transition`}
      >
        {/* ✅ Serial Number */}
        <td className="px-6 py-4">{index + 1}</td>  

        <td className="px-6 py-4">{book.title}</td>
        <td className="px-6 py-4">{book.author}</td>
        <td className="px-6 py-4">{book.isbn}</td>
        <td className="px-6 py-4">{book.category}</td>
        <td className="px-6 py-4">{book.quantity}</td>
        <td className="px-6 py-4 flex justify-center gap-3">
          <Link
          
            to={`/admin/edit/book/${book.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-base font-medium"
          >
            <Pencil className="w-5 h-5" />
            EDIT
          </Link>
          <button
            onClick={() => handleDelete(book.id)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-base font-medium"
          >
            <Trash2 className="w-5 h-5" />
            DELETE
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center py-6 text-gray-400 italic">
        No books found
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default BookList;
