// src/components/BookDetails.jsx

import React from 'react';

function BookDetails({ book }) {
  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <img src={book.image} alt={book.title} />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Price:</strong> Rs.{book.price}</p>
    </div>
  );
}

export default BookDetails;
