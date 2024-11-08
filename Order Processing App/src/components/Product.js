import React, { useState } from 'react';

const Product = ({ product, addToCart }) => {
  const { id, name, price, image } = product;
  const [quantity, setQuantity] = useState(1);

  const handleClick = () => {
    addToCart({ ...product, quantity });
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div className="product">
      <img src={`${process.env.PUBLIC_URL}/images/${image}`} alt={name} />
      <h3>{name}</h3>
      <p>₹{price}</p>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={handleQuantityChange}
        className="quantity-input"
      />
      <button onClick={handleClick}>Add to Cart</button>
    </div>
  );
};

export default Product;
