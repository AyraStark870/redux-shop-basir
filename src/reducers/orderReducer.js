import { types } from "../types/types";

const initialState = {};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case types.CLEAR_ORDER:
      return {
        ...state,
        order: null,
      };

    default:
      return state;
  }
};
