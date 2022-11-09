import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <label htmlFor="campo-pesquisa">
      <input type="text" />
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
      <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
    </label>
  );
}

export default Home;
