import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductPage from './components/ProductPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    // <div className="App">
    //   <Header />
    //   <ProductList />
    //   {/* <ProductPage/> */}
    // </div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProductList />} />
      {/* <Route path="/product" element={<ProductList />} /> */}
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
    </BrowserRouter>    
  );
}

export default App;
