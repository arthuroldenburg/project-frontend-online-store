import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <label htmlFor="campo-pesquisa">
        <input type="text" />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </label>
    </div>
  );
}

export default App;
