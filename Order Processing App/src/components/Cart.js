import React from 'react';

const Cart = ({ cart, removeFromCart, clearCart }) => {
  const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  return (
    <div className="cart">
      <h2>Receipt</h2>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product Name</th>
            <th>Price (₹)</th>
            <th>Quantity</th>
            <th>Amount (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.price * product.quantity}</td>
              <td>
                <button onClick={() => removeFromCart(product.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: ₹{total}</h3>
      <button onClick={clearCart} className="clear-cart-button">Clear Cart</button>     
    </div>
  );
};

export default Cart;
