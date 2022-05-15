import { types } from "../types/types";
import { fetchSinToken } from "../util";

export const createOrder = (order) => async (dispatch) => {
  const res = await fetchSinToken("orders", order, "POST");

  const data = await res.json();

  dispatch({ type: types.CREATE_ORDER, payload: data.newOrder });

  localStorage.clear("cartItems");
  dispatch({ type: types.CLEAR_CART });
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: types.CLEAR_ORDER });
};
