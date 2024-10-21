// src/pages/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  if (!cartItems || cartItems.length === 0) {
    return <div className="cart-empty">Your cart is empty!</div>;
  }

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h2>{item.name}</h2>
              <p>${item.price}</p>
              <div>
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                />
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <h2>
          Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </h2>
      </div>
    </div>
  );
};

export default Cart;
