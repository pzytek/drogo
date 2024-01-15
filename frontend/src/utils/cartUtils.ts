import { CartState } from "../slices/cartSlice";

export const addDecimals = (num: number) => {
  return Math.round(num * 100) / 100;
};

export const updateCart = (state: CartState) => {
  //Items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //Shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 10 ? 0 : 10);

  //Tax price
  state.taxPrice = addDecimals(0.15 * state.itemsPrice);

  //Total price
  state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
