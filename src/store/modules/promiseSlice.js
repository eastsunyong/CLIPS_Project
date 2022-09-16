import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  place: null,
  ts: null,
};

export const homeSlice = createSlice({
  name: "PROMISE",
  initialState,
  reducers: {
    resetState: () => initialState,
    setPlace: (state, action) => {
      state.place = action.payload;
    },
    setTemporaryStorage: (state, action) => {
      state.ts = action.payload;
    },
  },
});
export const { resetState, setPlace, setTemporaryStorage } = homeSlice.actions;
export default homeSlice.reducer;
