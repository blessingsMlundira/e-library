import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled out
    if (!title || !authors || !publishedDate) {
      setError('Please fill out all required fields.');
      return;
    }

    // Construct the new book object
    const newBook = {
      id: `book-${Date.now()}`, // Generate a temporary ID
      title,
      authors,
      publishedDate,
      description,
    };

    try {
      // Make a POST request to the server to add the book
      const response = await axios.post('http://localhost:3000/books/add', newBook);

      if (response.status === 201) {
        setSuccess('Book added successfully!');
        // Reset form fields after successful submission
        setTitle('');
        setAuthors('');
        setPublishedDate('');
        setDescription('');
        setError(null);
      }
    } catch (error) {
      setError('Error adding the book. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Add a New Book</h2>

      {/* Error and Success Messages */}
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {success && <div className="text-green-500 mb-4 text-center">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter book title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="authors">
            Authors
          </label>
          <input
            type="text"
            id="authors"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter authors (comma-separated)"
          />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="publishedDate">
                Published Date
            </label>
            <input
                type="date"
                id="publishedDate"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
            </div>


        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter book description (optional)"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
