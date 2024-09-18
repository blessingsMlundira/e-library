// EditBookForm.js

import React, { useState } from 'react';
import axios from 'axios';

const EditBookForm = ({ book, onClose, onUpdate }) => {
  const [title, setTitle] = useState(book.title);
  const [authors, setAuthors] = useState(book.authors);
  const [publishedDate, setPublishedDate] = useState(book.publishedDate);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:3000/books/edit', {
        id: book.id,
        title,
        authors,
        publishedDate,
      });

      if (response.status === 200) {
        alert('Book updated successfully');
        // Optionally, you can refresh the book list here
        const updatedBook = { ...book, title, authors, publishedDate };
        onUpdate((prevBooks) =>
          prevBooks.map((b) => (b.id === book.id ? updatedBook : b))
        );
        onClose();
      }
    } catch (error) {
      console.error('Error updating the book:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90vw] max-w-4xl h-[90vh] overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Authors:</label>
            <input
              type="text"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Published Date:</label>
            <input
              type="text"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBookForm;
