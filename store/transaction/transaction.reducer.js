// import { CAMPAIGNS_ACTION_TYPES } from "./campaigns.types.js";
import { TRANSACTION_ACTION_TYPES } from "./transaction.types";
const TRANSACTION_INITIAL_STATE = {
  confirmFormVis: false,
  data_order: {
    name: "",
    alamat: "",
    contact: "",
    _id_toko: "",
    cart: [{ id_product: "", qt: "", product_uom: "", total_price: 0 }],
  },
  error: "",
  postConfirmLoading: false,
};

export const transactionReducer = (state = TRANSACTION_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case TRANSACTION_ACTION_TYPES.TRANSACTION_BUY:
      return {
        ...TRANSACTION_INITIAL_STATE,
        confirmFormVis: true,
        data_order: {
          ...TRANSACTION_INITIAL_STATE.data_order,
          _id_toko: payload._id_toko,
          cart: payload.cart,
        },
      };
    case TRANSACTION_ACTION_TYPES.TRANSACTION_CONFIRM_CLOSE:
      return {
        ...TRANSACTION_INITIAL_STATE,
      };
    case TRANSACTION_ACTION_TYPES.TRANSACTION_SET_FORM:
      return {
        ...state,
        data_order: {
          ...state.data_order,
          ...payload,
        },
      };
    case TRANSACTION_ACTION_TYPES.TRANSACTION_CONFIRM_START:
      return {
        ...state,
        postConfirmLoading: true,
      };
    case TRANSACTION_ACTION_TYPES.TRANSACTION_CONFIRM_SUCCESS:
      return {
        ...state,
        postConfirmLoading: false,
        confirmFormVis: false,
      };
    case TRANSACTION_ACTION_TYPES.TRANSACTION_CONFIRM_FAILED:
      return {
        ...state,
        postConfirmLoading: false,
        error: payload,
        confirmFormVis: false,
      };
    default:
      return state;
  }
};
