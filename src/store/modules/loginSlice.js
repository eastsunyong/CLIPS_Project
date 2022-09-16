import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: false,
};

export const loginSlice = createSlice({
  name: "LOGIN",
  initialState,
  reducers: {
    isLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { isLogin } = loginSlice.actions;
export default loginSlice.reducer;
