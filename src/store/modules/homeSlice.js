import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: null,
  viewMiddle: false,
};

export const homeSlice = createSlice({
  name: "PAGE/HOME",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    toggleViewMiddle: (state) => {
      state.viewMiddle = !state.viewMiddle;
    },
  },
});

export const { setAddress, toggleViewMiddle } = homeSlice.actions;
export default homeSlice.reducer;
