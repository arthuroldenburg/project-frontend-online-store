import React from 'react';
import { getCategories } from '../services/api'

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categoriesList: [],
    }
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categoriesList: categories });
    console.log(categories);
  }

  render() {
    const { categoriesList } = this.state;
    console.log(categoriesList)
    return (
      <div>
        <h1>Categorias:</h1>
        { categoriesList.map(({ name, id }) => (
          <button
          data-testid="category"
          key={ id }
          >
            { name }
          </button>
        ) ) }
      </div>
    );
  }
}

export default Categories;
