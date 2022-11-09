import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardItem extends React.Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { title, price, productId } = this.props;
    const locStor = localStorage.getItem('cart');
    let listaCarrinho = [];

    if (locStor === null) {
      const produto = {
        title,
        price,
        productId,
        quantidade: 1,
      };

      listaCarrinho = [produto];
    } else {
      listaCarrinho = JSON.parse(locStor);
      let naoAchou = true;
      listaCarrinho.forEach((e) => {
        if (e.productId === productId) {
          e.quantidade += 1;
          naoAchou = false;
        }
      });

      if (naoAchou) {
        const produto = {
          title,
          price,
          productId,
          quantidade: 1,
        };

        listaCarrinho.push(produto);
      }

      localStorage.setItem('cart', listaCarrinho);
    }

    localStorage.setItem('cart', JSON.stringify(listaCarrinho));
  }

  render() {
    const { title, thumbnail, price, productId } = this.props;
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
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.onClick }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
};

export default CardItem;
