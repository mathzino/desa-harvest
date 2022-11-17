import { createAction } from "../reducer.utils";
import Swal from "sweetalert2";
import { TRANSACTION_ACTION_TYPES } from "./transaction.types";
import { saveTransaction } from "../alltransaction/alltransaction.action";
import axios from "axios";

const confirmTransactionFailed = (payload) => createAction(TRANSACTION_ACTION_TYPES.TRANSACTION_CONFIRM_FAILED, payload);
const setTransactionForm = (payload) => createAction(TRANSACTION_ACTION_TYPES.TRANSACTION_SET_FORM, payload);

const transactionCloseForm = () => createAction(TRANSACTION_ACTION_TYPES.TRANSACTION_CONFIRM_CLOSE);
const confirmTransactionStart = () => createAction(TRANSACTION_ACTION_TYPES.TRANSACTION_CONFIRM_START);
const confirmTransactionSuccess = () => createAction(TRANSACTION_ACTION_TYPES.TRANSACTION_CONFIRM_SUCCESS);

export const transactionBuy = (payload) => createAction(TRANSACTION_ACTION_TYPES.TRANSACTION_BUY, payload);
export const closeFormTransaction = (dispatch) => {
  Swal.fire({
    title: "Anda ingin membatalkan pembelian?",
    showCancelButton: true,
    confirmButtonText: "Batalkan",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Berhasil Membatalkan Pembelian", "", "success");
      dispatch(transactionCloseForm());
    }
  });
};
export const handleChangeTransaction = (e) => {
  let payload = {
    [e.target.name]: e.target.value,
  };
  return (dispatch) => {
    dispatch(setTransactionForm(payload));
  };
};
export const confirmTransactionAsync = (data_order, allTransactionId) => {
  return async (dispatch) => {
    dispatch(confirmTransactionStart());
    try {
      const createTransaction = await axios({
        method: "post",
        url: `http://malon.my.id:8888/api/seller/v1/transaction/createtransaction`,
        data: data_order,
      });
      const resCreateTransaction = createTransaction.data.data;

      const idTransaction = resCreateTransaction.code.transaction_id;

      dispatch(saveTransaction(idTransaction, allTransactionId));
      dispatch(confirmTransactionSuccess());
    } catch (error) {
      dispatch(confirmTransactionFailed(error));
    }
  };
};
export const getTotalPrice = (selectedCarts) => {
  let total = 0;
  total = selectedCarts.cart.reduce((pre, current) => pre + current.total_price, 0);
  return total;
};
