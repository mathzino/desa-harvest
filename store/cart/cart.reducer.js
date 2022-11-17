import { CART_ACTION_TYPES } from "./cart.types";
const CART_INITIAL_STATE = {
  cart: [],
};
export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.CART_SAVE:
      return {
        ...state,
        cart: payload,
      };
    default:
      return state;
  }
};
