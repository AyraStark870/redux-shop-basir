import { types } from "../types/types";

//export const addToCart = (items, product) => (dispatch) => {}

export const addToCart = (product) => {
  return (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    let alreadyExist = false;
    cartItems.forEach((x) => {
      if (x._id === product._id) {
        alreadyExist = true;
        x.count++;
      }
    });
    if (!alreadyExist) {
      cartItems.push({ ...product, count: 1 });
    }
    dispatch({
      type: types.ADD_TO_CART,
      payload: cartItems,
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
};

export const removeFromCart = (product) => {
  return (dispatch, getState) => {
    const cartItems = getState()
      .cart.cartItems.slice()
      .filter((x) => x._id !== product._id);

    dispatch({
      type: types.REMOVE_FROM_CART,

      payload: cartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
};
