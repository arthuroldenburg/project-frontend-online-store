import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';

function Home() {
  return (
    <div>
      <label htmlFor="campo-pesquisa">
        <input type="text" />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
      </label>
      <Categories />
      {/* <p>banana</p> */}
    </div>
  );
}

export default Home;
