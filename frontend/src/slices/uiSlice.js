import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    loginModal: false,
    cartOffcanvas: false,
    filtersColumn: true,
  },
  reducers: {
    setLoginModal: (state, action) => {
      state.loginModal = action.payload;
    },
    setCartOffcanvas: (state, action) => {
      state.cartOffcanvas = action.payload;
    },
    setFiltersColumn: (state, action) => {
      state.filtersColumn = action.payload;
    },
  },
});

export const { setLoginModal, setCartOffcanvas, setFiltersColumn } =
  uiSlice.actions;

export default uiSlice.reducer;
