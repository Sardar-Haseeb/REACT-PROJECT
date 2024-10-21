// src/components/ProductCard.jsx
import React from 'react';
import './ProductCard.css'; // Adjust your styles accordingly

const ProductCard = ({ product, onAddToCart, onCardClick }) => {
  return (
    <div className="product-card" onClick={() => onCardClick(product.id)}>
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
