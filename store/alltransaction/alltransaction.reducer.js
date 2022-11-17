// import { CAMPAIGNS_ACTION_TYPES } from "./campaigns.types.js";
import { ALLTRANSACTION_ACTION_TYPES } from "./alltransaction.types";
const TRANSACTION_INITIAL_STATE = {
  allTransactionId: [],
  dataAllTransaction: [],
  rating: [],
};

export const allTransactionReducer = (state = TRANSACTION_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ALLTRANSACTION_ACTION_TYPES.ALLTRANSACTION_TRANSACTION_SAVE:
      return {
        ...state,
        allTransactionId: payload,
      };
    case ALLTRANSACTION_ACTION_TYPES.ALLTRANSACTION_RATING_SET:
      return {
        ...state,
        rating: payload,
      };
    default:
      return state;
  }
};
