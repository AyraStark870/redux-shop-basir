import { types } from "../types/types";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload,
      };

    case types.REMOVE_FROM_CART:
      console.log(action.payload);
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};
