import React from 'react';
import { Switch, Route } from 'react-router';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Detail from './pages/Detail';

function App() {
  return (
    <Switch>
      <Route exact path="/productdetails/:id" component={ Detail } />
      <Route exact path="/cart" component={ Cart } />
      <Route exact path="/" component={ Home } />
    </Switch>
  );
}

export default App;
