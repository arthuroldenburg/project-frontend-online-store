import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import './Home.css';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CardItem from '../components/CardItem';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
      categoria: '',
      listaProdutos: [],
      somaCarrinho: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.categoryProducts = this.categoryProducts.bind(this);
    this.carrinhoLocalStorage = this.carrinhoLocalStorage.bind(this);
  }

  componentDidMount() {
    const locStorNumber = localStorage.getItem('itemCount');

    if (locStorNumber === null) {
      const contagem = 0;
      localStorage.setItem('itemCount', contagem.toString());
    } else {
      const cont = parseInt(localStorage.getItem('itemCount'), 10);
      this.setState({ somaCarrinho: cont });
    }
  }

  handleChange({ target }) {
    const valor = target.value;
    this.setState({ [target.name]: valor });
  }

  async getProducts() {
    const { input, categoria } = this.state;
    const retorno = await getProductsFromCategoryAndQuery(categoria, input);
    this.setState({ listaProdutos: retorno.results });
  }

  carrinhoLocalStorage() {
    const locStorNumber = localStorage.getItem('itemCount');
    let contagem;

    if (locStorNumber === null) {
      contagem = 1;
      localStorage.setItem('itemCount', contagem.toString());
    } else {
      contagem = parseInt(locStorNumber, 10);
      contagem += 1;
      localStorage.setItem('itemCount', contagem.toString());
    }

    this.setState({ somaCarrinho: contagem });
  }

  async categoryProducts({ target }) {
    const valor = target.value;
    const retorno = await getProductsFromCategoryAndQuery(valor, '');
    this.setState({ categoria: valor, listaProdutos: retorno.results });
  }

  render() {
    const { listaProdutos, somaCarrinho } = this.state;
    return (
      <div className="home-content">
        <div className="lado-esquerdo">
          <Categories handleChange={ this.categoryProducts } />
        </div>
        <div className="lado-direito">
          <div className="pesquisa">
            <input
              type="text"
              name="input"
              data-testid="query-input"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.getProducts }
            >
              Buscar
            </button>
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            <Link to="/cart" data-testid="shopping-cart-button">
              Carrinho
              <p data-testid="shopping-cart-size">{somaCarrinho}</p>
            </Link>
          </div>
          <div className="items">
            {
              (listaProdutos.length === 0)
                ? (<h4>Nenhum produto foi encontrado</h4>)
                : (listaProdutos.map((e) => (
                  <CardItem
                    price={ e.price }
                    thumbnail={ e.thumbnail }
                    key={ e.id }
                    productId={ e.id }
                    title={ e.title }
                    availableQ={ e.available_quantity }
                    localS={ this.carrinhoLocalStorage }
                  />)))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
