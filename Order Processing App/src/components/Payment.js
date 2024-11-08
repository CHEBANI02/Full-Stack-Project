// Payment.js
import React from 'react';

const Payment = ({ onPaymentSuccess }) => {
  const handlePayNow = () => {
    // Simulate a successful payment process
    const receiptData = {
      transactionId: '123456',
      amount: '$100.00',
      date: new Date().toLocaleDateString(),
      items: [
        { name: 'Product 1', price: '$50.00' },
        { name: 'Product 2', price: '$50.00' },
      ],
    };
    
    // Call the success callback
    onPaymentSuccess(receiptData);
  };

  return (
    <button onClick={handlePayNow}>Pay Now</button>
  );
};

export default Payment;
