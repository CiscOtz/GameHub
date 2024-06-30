import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar.js';
import './catalog.css';

const GameCatalog = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setGames(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching games:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="game-catalog"><h1>Loading...</h1></div>;
  }

  if (error) {
    return <div className="game-catalog"><h1>Error: {error.message}</h1></div>;
  }

  return (
    <div className="game-catalog">
      <h1>Video Game Catalog</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="game-grid">
        {filteredGames.map(game => (
          <div className="game-item" key={game._id}>
            <Link to={`/game/${game._id}`}>
              <img src={game.imageUrl} alt={game.name} className="game-image" />
              <h2>{game.name}</h2>
            </Link>
            <p><strong>Genre:</strong> {game.genre}</p>
            <p>{game.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCatalog;
