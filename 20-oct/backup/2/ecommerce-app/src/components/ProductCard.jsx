// src/components/ProductCard.jsx
import React from 'react';
import './ProductCard.css'; // Add some CSS for styling the product card

const ProductCard = ({ product, onAddToCart, onCardClick }) => {
  return (
    <div className="product-card" onClick={() => onCardClick(product.id)}>
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <button onClick={(e) => {
        e.stopPropagation(); // Prevent the card click event from firing
        onAddToCart(product);
      }}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
