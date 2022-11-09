import React from 'react';
import { Switch, Route } from 'react-router';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  return (
    <Switch>
      <Route exact path="/cart" component={ Cart } />
      <Route exact path="/" component={ Home } />
    </Switch>
  );
}

export default App;
