import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import { CartProvider } from './context/CartContext.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import GameCatalog from './components/catalog.js';
import GameDetails from './components/GameDetails.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Profile from './components/Profile.js';
import Cart from './components/Cart.js';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Routes>
              <Route path="/" element={<GameCatalog searchTerm={searchTerm} />} />
              <Route path="/game/:id" element={<GameDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer/>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
