import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axios } from "utils";
import { sweetalert } from "utils";

const initialState = {
  isLogin : false,
};

export const __newLogin = createAsyncThunk(
  "login/Login",
  async (payload, api) => {
    try {
      const res = await axios.default.post("/auth/signin", payload);
      sweetalert.successTimerAlert(res.data.message);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      api.dispatch(isLogin(true))
    } catch (err) {
      sweetalert.failAlert(err.response.data.message);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    isLogin: (state, action) => {
      state.login = action.payload;
    },
  },
  extraReducers:{
    [__newLogin.pending]: (state) => {
    },
    [__newLogin.fulfilled]: (state, action) => {

    },
    [__newLogin.rejected]: (state, action) => {
      console.log(action)
    },
  }
});

export const { isLogin } = loginSlice.actions;
export default loginSlice.reducer;
