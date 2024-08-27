// src/components/Receipt.jsx

import React from 'react';

function Receipt({ cart }) {
  return (
    <div className="receipt">
      <h2>Payment Successful</h2>
      <h3>Receipt</h3>
      {cart.map((book, index) => (
        <div key={index} className="receipt-item">
          <p>{book.title}</p>
          <p>Rs.{book.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Receipt;
