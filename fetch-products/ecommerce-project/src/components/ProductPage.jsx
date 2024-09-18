// src/components/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-1/2 h-auto object-cover"
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-gray-800 font-semibold mt-2">${product.price}</p>
          <p className="text-yellow-500">Rating: {product.rating}</p>
          <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
