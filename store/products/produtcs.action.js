import { createAction } from "../reducer.utils";
import { PRODUCTS_ACTION_TYPES } from "./products.types";
import axios from "axios";

const getProductByIDStart = () => {
  return createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCT_START);
};
const getProductByIdFailed = (payload) => {
  return createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCT_FAILED, payload);
};
const getProductByIdSuccess = (payload) => {
  return createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCT_SUCCESS, payload);
};
const fetchProductsStart = () => {
  return createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START);
};
const fetchProductsSuccess = (payload) => {
  return createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS, payload);
};
const fetchProductsFailed = (payload) => {
  return createAction(PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_FAILED, payload);
};

export const fetchProductsAsync = () => {
  return async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const { data } = await axios.get("http://malon.my.id:8888/api/user/v1/product/all");
      const allProduct = data.data;
      dispatch(fetchProductsSuccess(allProduct));
    } catch (error) {
      dispatch(fetchProductsFailed(error));
    }
  };
};

export const getProductByID = (idProduct, products) => {
  return (dispatch) => {
    dispatch(getProductByIDStart());
    try {
      const product = products.filter((p) => p.id_product == idProduct)[0];

      dispatch(getProductByIdSuccess(product));
    } catch (error) {
      dispatch(getProductByIdFailed(error));
    }
  };
};
export const getNameProd = (data, products) => {
  const id = data.id_product;
  let name = "";
  products.forEach((p) => {
    p.id_product == id ? (name = p.name) : (name = name);
  });
  return name;
};
