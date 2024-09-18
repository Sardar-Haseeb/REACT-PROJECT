import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Default");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);

        // Extract unique categories from the product list
        const uniqueCategories = ["All", ...new Set(data.products.map((product) => product.category))];
        setCategories(uniqueCategories);
      });
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  // Sort products based on the selected sort option
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "Price: Low to High") return a.price - b.price;
    if (sortOption === "Price: High to Low") return b.price - a.price;
    if (sortOption === "Title: A to Z") return a.title.localeCompare(b.title);
    if (sortOption === "Title: Z to A") return b.title.localeCompare(a.title);
    if (sortOption === "Rating: High to Low") return b.rating - a.rating;
    if (sortOption === "Rating: Low to High") return a.rating - b.rating;
    return 0; // Default or no sorting
  });

  return (<>
    <Header />
    <div className="container mx-auto">
      {/* Category Chips */}
      <div className="flex space-x-2 my-4">
        {categories.map((category) => (
          <Link to={`/product/${category.id}`}> 
          <button
            key={category}
            className={`px-3 py-1 rounded-full text-sm ${selectedCategory === category
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700"
              }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
        
          </button>
          </Link>
        ))}

      </div>

      {/* Sorting Dropdown */}
      <div className="my-4">
        <label className="mr-2 font-medium text-gray-700">Sort By:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-3 py-1 rounded border border-gray-300"
        >
          <option value="Default">Default</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
          <option value="Title: A to Z">Title: A to Z</option>
          <option value="Title: Z to A">Title: Z to A</option>
          <option value="Rating: High to Low">Rating: High to Low</option>
          <option value="Rating: Low to High">Rating: Low to High</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg">
            <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
            <h2 className="text-lg font-bold mt-2">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-500 text-sm">Category: {product.category}</p>
            <p className="text-gray-800 font-semibold mt-2">${product.price}</p>
            <p className="text-yellow-500">Rating: {product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  </>
  );
};

export default ProductList;
