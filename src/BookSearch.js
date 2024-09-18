import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function BookSearch({ setBooks }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/books/title?search=${searchQuery}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="flex justify-center mt-8 mb-4">
      <div className="relative w-full max-w-md">
        {/* Search Icon */}
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        
        {/* Search Input */}
        <input
          type="text"
          className="block w-full pl-10 pr-20 py-2 text-gray-700 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default BookSearch;
