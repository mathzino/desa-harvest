import { PRODUCTS_ACTION_TYPES } from "./products.types";

const PRODUCTS_INITIAL_STATE = {
  isLoading: false,
  products: [],
  productLoading: false,
  product: "",
  error: {},
};

export const productsReducer = (state = PRODUCTS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START:
      return {
        ...state,
        isLoading: true,
      };
    case PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS:
      return { ...state, isLoading: false, products: payload, error: {} };
    case PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_FAILED:
      return { ...state, isLoading: false, error: payload };
    case PRODUCTS_ACTION_TYPES.FETCH_PRODUCT_START:
      return {
        ...state,
        productLoading: true,
      };
    case PRODUCTS_ACTION_TYPES.FETCH_PRODUCT_SUCCESS:
      return { ...state, productLoading: false, product: payload };
    case PRODUCTS_ACTION_TYPES.FETCH_PRODUCT_FAILED:
      return { ...state, productLoading: false, error: payload };
    default:
      return state;
  }
};
