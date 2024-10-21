// src/pages/Home.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import './Home.css';

// Sample products data
const products = {
  mens: [
    { id: 1, name: "Men's Jacket", price: "$99", categoy: "men", img: "https://example.com/mens-jacket.jpg" },
    { id: 2, name: "Men's Shoes", price: "$79", categoy: "men", img: "https://example.com/mens-shoes.jpg" },
  ],
  womens: [
    { id: 3, name: "Women's Dress", price: "$89", categoy: "women", img: "https://example.com/womens-dress.jpg" },
    { id: 4, name: "Women's Handbag", price: "$69", categoy: "women", img: "https://example.com/womens-handbag.jpg" },
  ],
  kids: [
    { id: 5, name: "Kid's T-shirt", price: "$29", categoy: "kid", img: "https://example.com/kids-tshirt.jpg" },
    { id: 6, name: "Kid's Shoes", price: "$49", categoy: "kid", img: "https://example.com/kids-shoes.jpg" },
  ],
};

const Home = () => {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="hero">
          <h1>Welcome to Our E-Commerce Store</h1>
          <p>Shop the latest trends in fashion for men, women, and kids.</p>
          <button>Shop Now</button>
        </section>

        {/* Categories Section */}
        <section className="categories">
          <div className="category men">
            <h2>Men's</h2>
            <p>Explore men's fashion</p>
            <a href="/mens">Shop Now</a>
          </div>
          <div className="category women">
            <h2>Women's</h2>
            <p>Explore women's fashion</p>
            <a href="/womens">Shop Now</a>
          </div>
          <div className="category kid">
            <h2>Kids</h2>
            <p>Explore kids' fashion</p>
            <a href="/kids">Shop Now</a>
          </div>
        </section>

        {/* Products Section */}
        <section className="products">
          <h2>Men's Products</h2>
          <div className="product-list">
            {products.mens.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.img} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <p>{product.categoy}</p>
                <button>Add to Cart</button>
              </div>
            ))}
          </div>

          <h2>Women's Products</h2>
          <div className="product-list">
            {products.womens.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.img} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <button>Add to Cart</button>
              </div>
            ))}
          </div>

          <h2>Kids' Products</h2>
          <div className="product-list">
            {products.kids.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.img} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
                <button>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
