import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
import { Review, Item } from "../types";

interface CartState {
  cartItems: Item[];
  shippingAddress: object;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

const cartJson = localStorage.getItem("cart");

const initialState: CartState = cartJson
  ? JSON.parse(cartJson)
  : { cartItems: [], shippingAddress: {}, paymentMethod: "" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      console.log(action.payload);
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const item = action.payload;

      state.cartItems = state.cartItems.filter((x) => x._id !== item._id);

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export { CartState };

export default cartSlice.reducer;
