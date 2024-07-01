import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js'; // Update this line
import SearchBar from './searchBar.js';
import './header.css';

const Header = ({ searchTerm, setSearchTerm }) => {
  const { user, logout } = useAuth(); // Update this line
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">GAMEHUB</Link>
        <div className="search-container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="auth-buttons">
          {user ? (
            <>
              <Link to="/profile" className="auth-button">Perfil</Link>
              <Link to="/cart" className="auth-button">Carrito</Link>
              <button className="auth-button" onClick={handleLogout}>Cerrar Sesión</button>
            </>
          ) : (
            <>
              <button className="auth-button" onClick={() => navigate('/login')}>Iniciar Sesión</button>
              <button className="auth-button" onClick={() => navigate('/register')}>Registrarse</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
