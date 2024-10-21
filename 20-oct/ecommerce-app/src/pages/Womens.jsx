// src/pages/Womens.jsx
import React, { useEffect, useState, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the import based on your project structure
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CartContext } from '../context/CartContext'; // Import Cart Context
import './Womens.css'; // Add your custom styles if needed

const Womens = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const { addToCart } = useContext(CartContext); // Get addToCart function from context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter products for women's category
        const womensProducts = productsList.filter(product => product.category === 'Women');
        setProducts(womensProducts);
      } catch (err) {
        setError('Failed to load women\'s products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`); // Navigate to the product detail page
  };

  if (loading) {
    return <div>Loading women's products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Women's Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card" onClick={() => handleCardClick(product.id)}>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={(e) => {
              e.stopPropagation(); // Prevent card click event when adding to cart
              addToCart(product); // Add product to cart
            }}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Womens;
