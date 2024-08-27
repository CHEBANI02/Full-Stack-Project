// src/App.js

import React, { useState } from 'react';
import BookList from './components/BookList';
import Filter from './components/Filter';
import Cart from './components/Cart';
import Payment from './components/Payment';
import BookDetails from './components/BookDetails'; // Import the BookDetails component
import books from './data/books';
import './App.css';

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('');
  const [showCart, setShowCart] = useState(false);

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const handleFilterChange = (searchQuery) => {
    setFilter(searchQuery);
  };

  const handlePayNow = () => {
    // Your payment logic here
    alert('Payment Successful!');
    setCart([]); // Empty the cart after successful payment
  };

  const filteredBooks = books.filter((book) =>
    book.author.toLowerCase().includes(filter) || book.publisher.toLowerCase().includes(filter)
  );

  return (
    <div className="app">
      <div className="top-bar">
        <h1>Bookstore</h1>
        {cart.length > 0 && (
          <button onClick={handlePayNow} className="button pay-now-button">
            Pay Now
          </button>
        )}
        <button onClick={() => setShowCart(!showCart)} className="button show-cart-button">
          {showCart ? 'Hide Cart' : 'Show Cart'}
        </button>
      </div>
      {showCart && <Cart cart={cart} />}
      <Filter onChange={handleFilterChange} />
      {selectedBook && <BookDetails book={selectedBook} />}
      <BookList books={filteredBooks} onSelect={setSelectedBook} onAddToCart={addToCart} />
      {cart.length > 0 && !showCart && <Payment cart={cart} />} {/* Render Payment if cart has items and cart is not shown */}
    </div>
  );
}

export default App;
