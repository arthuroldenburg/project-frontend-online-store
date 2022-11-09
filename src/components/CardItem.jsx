import React from 'react';
import PropTypes from 'prop-types';

function CardItem({ title, thumbnail, price }) {
  return (
    <div data-testid="product">
      <img src={ thumbnail } alt={ title } />
      <h4>{`${title}: R$${price}`}</h4>
    </div>
  );
}

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default CardItem;
