import { types } from "../types/types";
import { fetchSinToken } from "../util";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetchSinToken("products");

  const data = await res.json();

  dispatch({
    type: types.FETCH_PRODUCTS,
    payload: data.products,
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: types.FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
    },
  });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  console.log(filteredProducts);
  const sortedProducts = filteredProducts.slice();
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  dispatch({
    type: types.ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};