// src/components/BookList.jsx

import React from 'react';

function BookList({ books, onSelect, onAddToCart }) {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-item">
          <img src={book.image} alt={book.title} />
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Price:</strong> Rs.{book.price}</p>
          <button onClick={() => onSelect(book)}>View Details</button>
          <button onClick={() => onAddToCart(book)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default BookList;
