import React from 'react';

const Modal = ({ book, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90vw] max-w-4xl h-[90vh] overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
        <p><strong>Authors:</strong> {book.authors}</p>
        <p><strong>Published Date:</strong> {book.publishedDate}</p>
        <p><strong>Description:</strong> {book.description}</p>
      </div>
    </div>
  );
};

export default Modal;
