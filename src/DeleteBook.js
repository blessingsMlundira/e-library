import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch books from the API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        setBooks(response.data);
      } catch (err) {
        setError('Failed to fetch books.');
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async () => {
    if (!selectedBook) {
      setError('Please select a book to delete.');
      return;
    }

    try {
      // Send DELETE request to the server
      await axios.delete(`http://localhost:3000/books/${selectedBook}`);
      setSuccess('Book deleted successfully.');
      setBooks(books.filter((book) => book.id !== selectedBook)); // Remove from UI
      setSelectedBook('');
      setError(null);
    } catch (err) {
      setError('Failed to delete the book.');
      setSuccess(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Delete a Book</h1>

      {/* Error and Success Messages */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}

      {/* Dropdown to Select Book */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="bookSelect">
          Select a book to delete:
        </label>
        <select
          id="bookSelect"
          value={selectedBook}
          onChange={(e) => setSelectedBook(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
        >
          <option value="">-- Choose a Book --</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>
      </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
      >
        Delete Book
      </button>
    </div>
  );
};

export default DeleteBook;
