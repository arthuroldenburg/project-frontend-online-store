export async function getCategories() {
  // Implemente aqui
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  let url;
  if (categoryId === '') {
    url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  } else if (query === '') {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  } else {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  }
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

export async function getProductById(productId) {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
  const url = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}
