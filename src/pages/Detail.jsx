import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

// Lindo!
class Detail extends React.Component {
  constructor() {
    super();

    this.state = {
      produto: { title: '', thumbnail: '', price: 0 },
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const product = await getProductById(id);

    this.setState({ produto: product });
  }

  render() {
    const { produto } = this.state;
    const { title, thumbnail, price } = produto;

    return (
      <div>
        <h1 data-testid="product-detail-name">{title}</h1>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <p data-testid="product-detail-price">{price}</p>
        <Link to="/cart">
          <button
            type="button"
            data-testid="product-detail-button"
          >
            Carrinho
          </button>
        </Link>
      </div>
    );
  }
}

Detail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Detail;
