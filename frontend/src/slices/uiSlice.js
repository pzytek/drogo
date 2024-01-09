import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    loginModal: false,
    cartOffcanvas: false,
  },
  reducers: {
    setLoginModal: (state, action) => {
      state.loginModal = action.payload;
    },
    setCartOffcanvas: (state, action) => {
      state.cartOffcanvas = action.payload;
    },
  },
});

export const { setLoginModal, setCartOffcanvas } = uiSlice.actions;

export default uiSlice.reducer;
