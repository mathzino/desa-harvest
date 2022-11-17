import { combineReducers } from "redux";
import { allTransactionReducer } from "./alltransaction/alltransaction.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { productsReducer } from "./products/products.reducer";
import { transactionReducer } from "./transaction/transaction.reducer";

export const rootReducer = combineReducers({
  products: productsReducer,
  transaction: transactionReducer,
  allTransaction: allTransactionReducer,
  cart: cartReducer,
});
