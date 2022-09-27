import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { decodeToken } from "react-jwt";

import { loginAPI } from "apis";
import { sweetalert } from "utils";
import { resetPromiseState } from "./promiseSlice";
import { resetReviewState } from "./reviewSlice";

const initialState = {
  userId: null,
};

// 로그인
export const __signin = createAsyncThunk("__signin", async (payload, api) => {
  const answer = await loginAPI.login(payload);

  if (answer.result) {
    localStorage.setItem("accessToken", answer.accessToken);
    localStorage.setItem("refreshToken", answer.refreshToken);

    api.dispatch(setLogin(answer.accessToken));
  } else {
    sweetalert.timer(answer.msg, "error");
  }
});

// 로그아웃
export const __signout = createAsyncThunk("__signout", async (payload, api) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const answer = await loginAPI.logout(refreshToken);

  if (answer.result) {
    localStorage.clear();
    api.dispatch(resetLoginState());
    api.dispatch(resetReviewState());
    api.dispatch(resetPromiseState());
  } else {
    sweetalert.timer("이미 로그아웃된 상태입니다", "error");
  }
});

export const loginSlice = createSlice({
  name: "PAGE/LOGIN",
  initialState,
  reducers: {
    resetLoginState: () => initialState,
    setLogin: (state, action) => {
      state.userId = decodeToken(action.payload).userId;
    },
  },
  extraReducers: {},
});

export const { setLogin, resetLoginState } = loginSlice.actions;
export default loginSlice.reducer;
