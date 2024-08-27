import React, { useState, useEffect } from 'react';
import Product from './components/Product';
import Cart from './components/Cart';
import PaymentSuccessModal from './components/PaymentSuccessModal';
import './index.css'; // Import CSS file for styling

const productsData = [
  { id: 1, name: 'Pencils', price: 10, image: 'product1.jpg' },
  { id: 2, name: 'Sketch Pens', price: 20, image: 'product2.jpg' },
  { id: 3, name: 'Erasers', price: 5, image: 'product3.jpg' },
  { id: 4, name: 'Sharpeners', price: 15, image: 'product4.jpg' },
  { id: 5, name: 'Crayons', price: 50, image: 'product5.jpg' },
  { id: 6, name: 'Highlighters', price: 40, image: 'product6.jpg' },
  { id: 7, name: 'Sticky Notes', price: 30, image: 'product7.jpg' },
  { id: 8, name: 'Staplers', price: 60, image: 'product8.jpg' },
  { id: 9, name: 'Paper Clips', price: 5, image: 'product9.jpg' },
  { id: 10, name: 'Notebooks', price: 70, image: 'product10.jpg' },
  { id: 11, name: 'Ruler', price: 20, image: 'product11.jpg' },
  { id: 12, name: 'Calculator', price: 150, image: 'product12.jpg' },
  { id: 13, name: 'Marker Pens', price: 30, image: 'product13.jpg' },
  { id: 14, name: 'Scissors', price: 25, image: 'product14.jpg' },
  { id: 15, name: 'Color Tapes', price: 35, image: 'product15.jpg' },
  // Add more products here
];

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0); // Initially set total amount to 0
  const [isModalVisible, setModalVisible] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [quantities, setQuantities] = useState({}); // Track quantities for each product

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Calculate total amount whenever cart changes
    const amount = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalAmount(amount);
  }, [cart]);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1; // Get the quantity from state, default to 1 if not set
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handlePaymentSuccess = () => {
    const receiptData = {
      transactionId: '123456',
      amount: totalAmount,
      date: new Date().toLocaleDateString(),
      items: cart,
    };
    setReceipt(receiptData);
    setModalVisible(true);
    clearCart();
  };

  const closeModal = () => {
    setModalVisible(false);
    setReceipt(null);
  };

  return (
    <div>
      <div className="app-header">
        <h1>Order Processing Application</h1>
      </div>
      <div className="cart-button-container">
        <button className="view-cart-button" onClick={toggleCart}>View Cart</button>
        <button className="pay-now-button" onClick={handlePaymentSuccess}>Pay Now</button>
      </div>

      <h2>Net Total: ₹{totalAmount}</h2> {/* Display total amount */}
      {showCart && <Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />}
      <div className="products-grid">
        {productsData.map((product) => (
          <div key={product.id} className="product">
            <img src={`${process.env.PUBLIC_URL}/images/${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            {/* Quantity input */}
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="quantity-input"
              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
            />
            {/* Add to Cart button */}
            <button onClick={() => addToCart(product)} className="add-to-cart-button">Add to Cart</button>
          </div>
        ))}
      </div>
      {isModalVisible && <PaymentSuccessModal receipt={receipt} onClose={closeModal} />}
    </div>
  );
}

export default App;
