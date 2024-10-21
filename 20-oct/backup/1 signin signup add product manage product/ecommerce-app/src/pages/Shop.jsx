import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the import based on your project structure
import ProductCard from '../components/ProductCard'; // Import the ProductCard component
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products'); // Adjust 'products' to your Firestore collection name
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log(`${product.name} added to cart!`);
  };

  const handleCardClick = (id) => {
    navigate(`/product/${id}`); // Navigate to ProductDetail page
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="shop">
      <h1>Shop</h1>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart} 
            onCardClick={handleCardClick} // Pass the click handler to ProductCard
          />
        ))}
      </div>
    </div>
  );
};

export default Shop;
