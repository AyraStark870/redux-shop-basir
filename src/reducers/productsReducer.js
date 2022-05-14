import { types } from "../types/types";

const initialState = {
  items: [],
  sort: "",
  size: "",
  filteredItems: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        size: action.payload.size,
        filteredItems: action.payload.items,
      };
    case types.ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };
    case types.FETCH_PRODUCTS:
      //  return { items: action.payload };
      return { items: action.payload, filteredItems: action.payload };
    default:
      return state;
  }
};
