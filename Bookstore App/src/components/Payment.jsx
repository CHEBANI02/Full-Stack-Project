// src/components/Payment.jsx

import React, { useState } from 'react';
import './Payment.css'; // Import the Payment CSS file

function Payment({ cart }) {
  const [showReceipt, setShowReceipt] = useState(false);

  const handlePayNow = () => {
    setShowReceipt(true);
  };

  const totalAmount = cart.reduce((sum, book) => sum + book.price, 0);

  return (
    <div className="payment">
      <button onClick={handlePayNow}>Pay Now</button>

      {showReceipt && (
        <div className="receipt-popup">
          <div className="receipt-content">
            <h2>Receipt</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>Rs.{book.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total: Rs.{totalAmount}</h3>
            <button onClick={() => setShowReceipt(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
