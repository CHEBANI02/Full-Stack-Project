import React from 'react';
import './PaymentSuccessModal.css';

const PaymentSuccessModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  const { transactionId, totalAmount, orderDate, items } = receipt;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Payment Successful</h2>
        <p><strong>Transaction ID:</strong> {transactionId}</p>
        <p><strong>Total Amount:</strong> ₹{totalAmount}</p> {/* Display Total Amount */}
        <p><strong>Order Date:</strong> {orderDate}</p> {/* Display Order Date */}
        
        <h3>Order Items:</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name} - ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
            </li>
          ))}
        </ul>
        
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
