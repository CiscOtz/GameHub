import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GameCatalog from './components/catalog.js';
import GameDetails from './components/GameDetails.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GameCatalog />} />
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
