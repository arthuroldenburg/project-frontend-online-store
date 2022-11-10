import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      cheio: false,
      carrinho: [],
    };

    this.criarCarrinho = this.criarCarrinho.bind(this);
    this.mudarQuantidade = this.mudarQuantidade.bind(this);
    this.deletarProduto = this.deletarProduto.bind(this);
  }

  componentDidMount() {
    const locStor = localStorage.getItem('cart');
    if (locStor !== null) {
      const lista = JSON.parse(locStor);
      this.setState({ cheio: true, carrinho: lista });
    }
  }

  mudarQuantidade({ target }) {
    const valor = target.value;
    const id = target.name;
    const locStor = JSON.parse(localStorage.getItem('cart'));
    let contagem = parseInt(localStorage.getItem('itemCount'), 10);

    locStor.forEach((e) => {
      if (e.productId === id) {
        if (valor === 'diminuir') {
          e.quantidade -= 1;
          contagem -= 1;
        } else {
          e.quantidade += 1;
          contagem += 1;
        }
      }
    });

    localStorage.setItem('itemCount', contagem.toString());
    localStorage.setItem('cart', JSON.stringify(locStor));
    this.setState({ carrinho: locStor });
  }

  deletarProduto({ target }) {
    const id = target.name;
    const locStor = JSON.parse(localStorage.getItem('cart'));
    let index;
    let quant;

    locStor.forEach((e, i) => {
      if (e.productId === id) {
        index = i;
        quant = e.quantidade;
      }
    });

    let contagem = parseInt(localStorage.getItem('itemCount'), 10);
    contagem -= quant;
    localStorage.setItem('itemCount', contagem.toString());

    locStor.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(locStor));
    this.setState({ carrinho: locStor });
  }

  criarCarrinho() {
    const { carrinho } = this.state;
    const cards = carrinho.map((e) => {
      const card = (
        <li key={ e.productId }>
          <button
            type="button"
            data-testid="remove-product"
            name={ e.productId }
            onClick={ this.deletarProduto }
          >
            Remover
          </button>
          <p data-testid="shopping-cart-product-name">{e.title}</p>
          <p>{`R$ ${e.price}`}</p>
          <button
            type="button"
            name={ e.productId }
            data-testid="product-decrease-quantity"
            disabled={ e.quantidade === 1 }
            value="diminuir"
            onClick={ this.mudarQuantidade }
          >
            Diminuir
          </button>
          <p data-testid="shopping-cart-product-quantity">{`Quant: ${e.quantidade}`}</p>
          <button
            type="button"
            name={ e.productId }
            data-testid="product-increase-quantity"
            value="aumentar"
            onClick={ this.mudarQuantidade }
          >
            Aumentar
          </button>
        </li>);
      return card;
    });

    return cards;
  }

  render() {
    const { cheio } = this.state;

    return (
      <div>
        { cheio ? this.criarCarrinho()
          : (<h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>) }
        <Link to="/checkout" data-testid="checkout-products">
          <button type="button">Finalizar Compra</button>
        </Link>
      </div>
    );
  }
}

export default Cart;
