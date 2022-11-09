import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Cart({ cartList }) {
  const verification = cartList.length > 0;
  const [cheio] = useState(verification);

  return (
    <div>
      { cheio ? ('')
        : (<h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>) }
    </div>
  );
}

Cart.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.string),
};

Cart.defaultProps = {
  cartList: [],
};

export default Cart;
