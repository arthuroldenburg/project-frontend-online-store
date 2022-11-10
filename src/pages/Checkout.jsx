import React from 'react';
import { Redirect } from 'react-router-dom';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      cheio: false,
      carrinho: [],
      errorCheck: false,
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      cep: '',
      endereco: '',
      payment: '',
      finalizado: false,
    };

    this.criarCarrinho = this.criarCarrinho.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.finalizarCompra = this.finalizarCompra.bind(this);
  }

  componentDidMount() {
    const locStor = localStorage.getItem('cart');
    if (locStor !== null) {
      const lista = JSON.parse(locStor);
      this.setState({ cheio: true, carrinho: lista });
    }
  }

  handleChange({ target }) {
    const valor = target.value;
    const nome = target.name;

    this.setState({ [nome]: valor }, () => {
      if (this.verification()) {
        this.setState({ errorCheck: false });
      }
    });
  }

  verification() {
    const { nome, email, cpf, telefone, cep, endereco, payment } = this.state;
    const bool = ((nome.length > 0) && (email.length > 0) && (cpf.length > 0)
      && (telefone.length > 0) && (cep.length > 0) && (endereco.length > 0)
      && (payment.length > 0));

    return bool;
  }

  criarCarrinho() {
    const { carrinho } = this.state;
    const cards = carrinho.map((e) => {
      const card = (
        <li key={ e.productId }>
          <h5>{e.title}</h5>
          <p>{`R$ ${e.price}`}</p>
          <p>{`Quant: ${e.quantidade}`}</p>
        </li>);
      return card;
    });

    return cards;
  }

  finalizarCompra() {
    if (this.verification()) {
      localStorage.removeItem('cart');
      localStorage.setItem('itemCount', '0');
      this.setState({ finalizado: true });
    } else {
      this.setState({ errorCheck: true });
    }
  }

  render() {
    const { cheio, errorCheck, finalizado } = this.state;
    return (
      <div>
        {
          cheio ? (<ul>{this.criarCarrinho()}</ul>) : ('')
        }
        <form>
          <label htmlFor="input-nome">
            Nome Completo:
            <input
              data-testid="checkout-fullname"
              name="nome"
              type="text"
              id="input-nome"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-email">
            Email:
            <input
              data-testid="checkout-email"
              name="email"
              type="text"
              id="input-email"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-cpf">
            CPF:
            <input
              data-testid="checkout-cpf"
              name="cpf"
              type="text"
              id="input-cpf"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-phone">
            Telefone:
            <input
              data-testid="checkout-phone"
              name="telefone"
              type="text"
              id="input-phone"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-cep">
            CEP:
            <input
              data-testid="checkout-cep"
              name="cep"
              type="text"
              id="input-cep"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-end">
            Endereço
            <input
              data-testid="checkout-address"
              name="endereco"
              type="text"
              id="input-end"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="nota1">
            <input
              type="radio"
              name="payment"
              id="nota1"
              value="boleto"
              data-testid="ticket-payment"
              onChange={ this.handleChange }
            />
            Boleto
          </label>
          <label htmlFor="nota2">
            <input
              type="radio"
              name="payment"
              id="nota2"
              value="Visa"
              data-testid="visa-payment"
              onChange={ this.handleChange }
            />
            Visa
          </label>
          <label htmlFor="nota3">
            <input
              type="radio"
              name="payment"
              id="nota3"
              value="MasterCard"
              data-testid="master-payment"
              onChange={ this.handleChange }
            />
            MasterCard
          </label>
          <label htmlFor="nota4">
            <input
              type="radio"
              name="payment"
              id="nota4"
              value="Elo"
              data-testid="elo-payment"
              onChange={ this.handleChange }
            />
            Elo
          </label>

          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.finalizarCompra }
          >
            Finalizar
          </button>

          { finalizado ? (<Redirect to="/" />) : ('') }
        </form>

        { (errorCheck)
          ? (<span data-testid="error-msg">Campos inválidos</span>) : ('') }

      </div>
    );
  }
}

export default Checkout;
