import React from 'react';

function Home() {
  return (
    <label htmlFor="campo-pesquisa">
      <input type="text" />
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    </label>
  );
}

export default Home;
