import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext.js';
import './GameDetails.css';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => {
        setGame(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al retribuir el juego', error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(game);
    setCartMessage('Juego añadido al carrito');
    setTimeout(() => setCartMessage(''), 3000);
  };

  if (loading) {
    return <div className="game-details"><h1>Cargando...</h1></div>;
  }

  if (error) {
    return <div className="game-details"><h1>Error: {error.message}</h1></div>;
  }

  if (!game) {
    return <div className="game-details"><h1>Juego no encontrado.</h1></div>;
  }

  return (
    <div className="game-details">
      <h1>{game.name}</h1>
      <img src={game.imageUrl} alt={game.name} className="game-image" />
      <p><strong>Precio:</strong> {game.price}</p>
      <p><strong>Géneros:</strong> {game.category}</p>
      <p>{game.description}</p>
      <p><strong>Requisitos:</strong> {game.requirements}</p>
      <button className="add-to-cart-button" onClick={handleAddToCart}>Añadir al carrito</button>
      {cartMessage && <p className="cart-message">{cartMessage}</p>}
    </div>
  );
};

export default GameDetails;
