import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import FormDetail from '../components/FormDetail';

class Detail extends React.Component {
  constructor() {
    super();

    this.state = {
      produto: { title: '', thumbnail: '', price: 0, id: '' },
      somaProdutos: 0,
    };

    this.onClick = this.onClick.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const product = await getProductById(id);
    const contagem = parseInt(localStorage.getItem('itemCount'), 10);

    this.setState({ produto: product, somaProdutos: contagem });
  }

  onClick() {
    const { produto } = this.state;
    const { title, price, id } = produto;
    const locStor = localStorage.getItem('cart');
    let listaCarrinho = [];

    if (locStor === null) {
      const product = {
        title,
        price,
        productId: id,
        quantidade: 1,
      };

      listaCarrinho = [product];
    } else {
      listaCarrinho = JSON.parse(locStor);
      let naoAchou = true;
      listaCarrinho.forEach((e) => {
        if (e.productId === id) {
          e.quantidade += 1;
          naoAchou = false;
        }
      });

      if (naoAchou) {
        const product = {
          title,
          price,
          productId: id,
          quantidade: 1,
        };

        listaCarrinho.push(product);
      }

      localStorage.setItem('cart', listaCarrinho);
    }

    localStorage.setItem('cart', JSON.stringify(listaCarrinho));
  }

  render() {
    const { produto, somaProdutos } = this.state;
    const { title, thumbnail, price } = produto;
    const { match } = this.props;
    const { id } = match.params;

    return (
      <div>
        <div>
          <h1 data-testid="product-detail-name">{title}</h1>
          <img
            data-testid="product-detail-image"
            src={ thumbnail }
            alt={ title }
          />
          <p data-testid="product-detail-price">{price}</p>
          <button
            type="button"
            onClick={ this.onClick }
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao Carrinho
          </button>
          <Link to="/cart">
            <button
              type="button"
              data-testid="shopping-cart-button"
            >
              Carrinho
            </button>
          </Link>
          <p data-testid="shopping-cart-size">{somaProdutos}</p>
        </div>
        <FormDetail id={ id } />
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
