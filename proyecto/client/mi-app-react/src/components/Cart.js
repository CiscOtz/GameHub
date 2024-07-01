import React from 'react';
import { useCart } from '../context/CartContext.js';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return <div className="cart"><h1>El carrito esta vacio</h1></div>;
  }

  return (
    <div className="cart">
      <h1>Tu carrito</h1>
      <ul>
        {cart.map((game) => (
          <li key={game._id}>
            <img src={game.imageUrl} alt={game.name} />
            <div>
              <h2>{game.name}</h2>
              <p>{game.price}</p>
              <button onClick={() => removeFromCart(game._id)}>Retirar</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Limpiar Carrito</button>
    </div>
  );
};

export default Cart;
