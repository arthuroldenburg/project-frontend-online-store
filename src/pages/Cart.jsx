import React from 'react';

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      cheio: false,
      carrinho: [],
    };

    this.criarCarrinho = this.criarCarrinho.bind(this);
  }

  componentDidMount() {
    const locStor = localStorage.getItem('cart');
    if (locStor !== null) {
      const lista = JSON.parse(locStor);
      this.setState({ cheio: true, carrinho: lista });
    }
  }

  criarCarrinho() {
    const { carrinho } = this.state;
    const cards = carrinho.map((e) => {
      const card = (
        <li key={ e.productId }>
          <p data-testid="shopping-cart-product-name">{e.title}</p>
          <p>{`R$ ${e.price}`}</p>
          <p data-testid="shopping-cart-product-quantity">{`Quant: ${e.quantidade}`}</p>
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
      </div>
    );
  }
}

export default Cart;
