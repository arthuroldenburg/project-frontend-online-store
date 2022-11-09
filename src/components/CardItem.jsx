import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardItem({ title, thumbnail, price, productId }) {
  return (
    <div data-testid="product">
      <img src={ thumbnail } alt={ title } />
      <h4>{`${title}: R$${price}`}</h4>
      <Link
        to={ `/productdetails/${productId}` }
        data-testid="product-detail-link"
      >
        Detalhes
      </Link>
    </div>
  );
}

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
};

export default CardItem;
