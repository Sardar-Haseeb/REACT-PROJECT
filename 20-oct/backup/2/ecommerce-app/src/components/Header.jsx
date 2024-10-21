import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from '@ant-design/icons'; // Import Ant Design icon
import '../style/style.css';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        E-Commerce
      </Link>
      <nav className="flex items-center">
        <Link to="/" className="mx-2 hover:underline">Home</Link>
        <Link to="/shop" className="mx-2 hover:underline">Shop</Link>
        <Link to="/womens" className="mx-2 hover:underline">Women's</Link>
        <Link to="/mens" className="mx-2 hover:underline">Men's</Link>
        <Link to="/kids" className="mx-2 hover:underline">Kids</Link>
        
        {/* Use Ant Design ShoppingCartOutlined icon */}
        <Link to="/cart" className="mx-2 hover:underline flex items-center">
          <ShoppingCartOutlined className="text-white" style={{ fontSize: '20px' }} />
        </Link>
      </nav>

      {/* Login Button */}
      <Link to="/login" className="header-login-button">
        Login
      </Link>
    </header>
  );
};

export default Header;
