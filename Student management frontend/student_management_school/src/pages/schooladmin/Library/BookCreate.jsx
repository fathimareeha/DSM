import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function BookCreateForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(1);

  const createBook = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!title || !author || !isbn || !category || !quantity) {
      toast.error('All fields are required');
      return;
    }

    try {
      const bookData = {
        title,
        author,
        isbn,
        category,
        quantity,
      };

      const response = await axios.post(
        'http://127.0.0.1:8000/schoolapp/bookcreate/',
        bookData,
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Book added successfully');

      // Clear form
      setTitle('');
      setAuthor('');
      setIsbn('');
      setCategory('');
      setQuantity(1);

    } catch (error) {
      console.error(error);
      toast.error('Failed to add book');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Book</h2>

      <form onSubmit={createBook} className="space-y-6">
        <fieldset className="border border-gray-300 p-4 rounded">
          <legend className="text-lg font-semibold text-gray-700">Book Details</legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Title */}
            <div>
              <label className="block font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block font-medium">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* ISBN */}
            <div>
              <label className="block font-medium">Code / ISBN</label>
              <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-medium">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-medium">Quantity</label>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-6"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default BookCreateForm;
