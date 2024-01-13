const filterProducts = (products, filters) =>
  products
    //categories
    .filter(
      (product) =>
        filters.categories.length === 0 ||
        filters.categories.includes(product.category)
    )
    //availability
    .filter((product) =>
      filters.availability === "In stock"
        ? product.countInStock > 0
        : filters.availability === "Out of stock"
        ? product.countInStock === 0
        : true
    )
    //price
    .sort((productA, productB) =>
      filters.price === "Ascending"
        ? productA.price - productB.price
        : filters.price === "Descending"
        ? productB.price - productA.price
        : 0
    )
    //minPrice
    .filter((product) => product.price >= filters.minPrice)
    //rating
    .filter((product) => product.rating >= filters.rating);

export default filterProducts;
