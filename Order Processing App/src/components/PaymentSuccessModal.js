// PaymentSuccessModal.js
import React from 'react';
import './PaymentSuccessModal.css';

const PaymentSuccessModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Payment Successful</h2>
        <p>Transaction ID: {receipt.transactionId}</p>
        <p>Amount: ₹{receipt.amount}</p>
        <p>Date: {receipt.date}</p>
        <h3>Items:</h3>
        <ul>
          {receipt.items.map((item, index) => (
            <li key={index}>{item.name} - ₹{item.price} x {item.quantity}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
