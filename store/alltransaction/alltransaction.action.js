import { createAction } from "../reducer.utils";
import { ALLTRANSACTION_ACTION_TYPES } from "./alltransaction.types";

const allTransactionSaveId = (allId) => createAction(ALLTRANSACTION_ACTION_TYPES.ALLTRANSACTION_TRANSACTION_SAVE, allId);
export const saveTransaction = (id, allId) => {
  allId.push(id);

  return (dispatch) => {
    dispatch(allTransactionSaveId(allId));
  };
};

export const deleteTransaction = (id, allId) => {
  allId = allId.filter((a) => a != id);

  return (dispatch) => {
    dispatch(allTransactionSaveId(allId));
  };
};

export const saveRating = (payload) => createAction(ALLTRANSACTION_ACTION_TYPES.ALLTRANSACTION_RATING_SET, payload);
export const setRatingReducer = (idProduct, star, ratingArr) => {
  const ratingObj = { idProduct, star };
  if (ratingArr.length < 1) {
    ratingArr.push(ratingObj);
  } else {
    let checked = false;
    ratingArr.forEach((e) => {
      if (e.idProduct == idProduct) {
        e.star = star;
        checked = true;
      }
    });
    if (checked == false) {
      ratingArr.push(ratingObj);
    }
  }

  return async (dispatch) => {
    dispatch(saveRating(ratingArr));
  };
};
