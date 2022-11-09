import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import './Home.css';
// import CardItem from '../components/CardItem';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CardItem from '../components/CardItem';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
      categoria: '',
      listaProdutos: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.getProducts = this.getProducts.bind(this);
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

  render() {
    const { listaProdutos } = this.state;
    return (
      <div className="home-content">
        <div className="lado-esquerdo">
          <Categories handleChange={ this.handleChange } />
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
            <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
          </div>
          <div className="items">
            {
              (listaProdutos.length === 0)
                ? (<h4>Nenhum produto foi encontrado</h4>)
                : (listaProdutos.map(({ price, thumbnail, title, id }) => (
                  <CardItem
                    price={ price }
                    thumbnail={ thumbnail }
                    key={ id }
                    title={ title }
                  />)))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
