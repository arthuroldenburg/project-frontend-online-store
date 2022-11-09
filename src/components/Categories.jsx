import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();

    this.state = {
      categoriesList: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categoriesList: categories });
  }

  render() {
    const { handleChange } = this.props;
    const { categoriesList } = this.state;
    return (
      <div className="categories">
        <h1>Categorias:</h1>
        { categoriesList.map(({ name, id }) => (
          <button
            type="button"
            name="categoria"
            value={ id }
            data-testid="category"
            key={ id }
            onClick={ handleChange }
          >
            { name }
          </button>
        ))}
      </div>
    );
  }
}

Categories.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Categories;
