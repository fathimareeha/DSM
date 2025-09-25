import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BookEdit() {
  const { id } = useParams(); // get book ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    quantity: "",
  });

  // Fetch book details on page load
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/schoolapp/bookdetail/${id}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle update (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://127.0.0.1:8000/schoolapp/bookdetail/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      alert("Book updated successfully!");
      navigate("/admin/list/books"); // redirect back to book list
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800 border-b pb-2">
        Edit Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full px-3 py-2 border rounded-md"
          required
        />

        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full px-3 py-2 border rounded-md"
          required
        />

        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          className="w-full px-3 py-2 border rounded-md"
          required
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full px-3 py-2 border rounded-md"
          required
        />

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full px-3 py-2 border rounded-md"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}

export default BookEdit;
