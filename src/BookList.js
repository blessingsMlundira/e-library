// Updated BookList component

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal'; // assuming you have a Modal component
import EditBookForm from './EditBookForm'; // new component for editing books

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books');
        setBooks(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Book List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
  <div key={book.id} className="border rounded-lg shadow-lg overflow-hidden">
    {/* Top section with red background */}
    <div className="bg-red-600 w-full p-4">
      <h2 className="text-2xl font-semibold text-white text-center">{book.title}</h2>
    </div>

    {/* Content Section */}
    <div className="p-6 flex flex-col items-center text-center space-y-4">
      <p className="text-gray-700 flex items-center">
        <FontAwesomeIcon icon={faUser} className="mr-2" /> {book.authors}
      </p>
      <p className="text-gray-600 flex items-center">
        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> {book.publishedDate}
      </p>

      {/* Button Section */}
      <div className="flex space-x-4">
        <button
          onClick={() => setSelectedBook(book)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Read More
        </button>
        <button
          onClick={() => setEditingBook(book)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
))}

      </div>
      {selectedBook && <Modal book={selectedBook} onClose={() => setSelectedBook(null)} />}
      {editingBook && (
        <EditBookForm book={editingBook} onClose={() => setEditingBook(null)} onUpdate={setBooks} />
      )}
    </div>
  );
};

export default BookList;
