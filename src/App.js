import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import BookList from './BookList';
import AddBook from './AddBook';
import DeleteBook from './DeleteBook';
import BookSearch from './BookSearch';  // Import the search component

function App() {
  const [books, setBooks] = useState([]);  // State to store searched books

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4 justify-center text-white">
            <li>
              <Link to="/" className="hover:text-blue-400">Browse Books</Link>
            </li>
            <li>
              <Link to="/add" className="hover:text-blue-400">Add Book</Link>
            </li>
          
            <li>
              <Link to="/delete" className="hover:text-blue-400">Delete Book</Link>
            </li>
          </ul>
        </nav>

        {/* Search Box */}
        <div className="mt-4">
          <BookSearch setBooks={setBooks} />
        </div>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<BookList books={books} setBooks={setBooks} />} />
          <Route path="/add" element={<AddBook />} />
          
          <Route path="/delete" element={<DeleteBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
