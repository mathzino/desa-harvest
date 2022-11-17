export const getTotalPrice = (selectedCarts) => {
  let total = 0;
  total = selectedCarts.cart.reduce((pre, current) => pre + current.total_price, 0);
  return total;
};
