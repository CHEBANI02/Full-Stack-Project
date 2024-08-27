// src/components/Cart.jsx

import React from 'react';

function Cart({ cart }) {
  const totalAmount = cart.reduce((sum, book) => sum + book.price, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <table className="cart-table">
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
      )}
      <h3>Total: Rs.{totalAmount}</h3>
    </div>
  );
}

export default Cart;
