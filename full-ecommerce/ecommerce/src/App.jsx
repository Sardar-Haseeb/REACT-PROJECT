
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import SignUp from './pages/Auth/Signup'
import SignIn from './pages/Auth/Signin'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetails'
import Carts from './pages/Cart'
import Orders from './pages/orders'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter >

        <Routes>
          {/* auth */}
          <Route path="/auth">
            <Route index element={<Auth />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Route>
          {/* auth */}
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Carts />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
