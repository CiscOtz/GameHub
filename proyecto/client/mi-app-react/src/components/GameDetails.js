import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GameDetails.css';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => {
        setGame(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching game:', error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="game-details"><h1>Loading...</h1></div>;
  }

  if (error) {
    return <div className="game-details"><h1>Error: {error.message}</h1></div>;
  }

  if (!game) {
    return <div className="game-details"><h1>No game found.</h1></div>;
  }

  return (
    <div className="game-details">
      <h1>{game.name}</h1>
      <img src={game.imageUrl} alt={game.name} className="game-image" />
      <p><strong>Géneros:</strong> {game.category}</p>
      <p>{game.description}</p>
    </div>
  );
};

export default GameDetails;
