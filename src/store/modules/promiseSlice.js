import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

import { promiseAPI } from "apis";

// 리스트 조회
export const __getPromiseList = createAsyncThunk("__getPromiseList", async (payload, api) => {
  const answer = await promiseAPI.getList();

  if (answer.result) {
    return api.fulfillWithValue(answer.list);
  } else {
    return api.rejectWithValue();
  }
});

// 상세 조회
export const __getPromise = createAsyncThunk("__getPromise", async (payload, api) => {
  const answer = await promiseAPI.getPromise(payload);

  if (answer.result) {
    return api.fulfillWithValue(answer.promise);
  } else {
    return api.rejectWithValue();
  }
});

// 약속 추가
export const __addPromise = createAsyncThunk("__addPromise", async (payload, api) => {
  const answer = await promiseAPI.addList(payload);

  api.dispatch(resetAddData());

  if (answer.result) {
    api.dispatch(__getPromiseList());
  } else {
    return api.rejectWithValue();
  }
});

// 약속 삭제
export const __deletePromise = createAsyncThunk("__deletePromise", async (payload, api) => {
  const answer = await promiseAPI.deletePromise(payload);

  if (answer.result) {
    api.dispatch(__getPromiseList());
  } else {
    return api.rejectWithValue();
  }
});

const initialState = {
  isLoading: false,
  promiseList: [],
  addData: { title: null, friendList: null, date: null, place: { name: null, address: null, coord: { x: null, y: null } }, penalty: null },
  selectPromise: { toggle: false, promise: null },
};

export const promiseSlice = createSlice({
  name: "PAGE/PROMISE",
  initialState,
  reducers: {
    resetPromiseState: () => initialState,
    setAddData: (state, action) => {
      state.addData = { ...state.addData, ...action.payload };
    },
    resetAddData: (state) => {
      state.addData = initialState.addData;
    },
    detatilToggle: (state) => {
      state.selectPromise = { ...state.selectPromise, toggle: false };
    },
  },
  extraReducers: {
    [__getPromiseList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPromiseList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.promiseList = action.payload;
    },
    [__getPromiseList.rejected]: (state) => {
      state.isLoading = false;
    },

    // 오히려 깜빡임 있어보임
    [__getPromise.pending]: (state) => {
      // state.isLoading = true;
    },
    [__getPromise.fulfilled]: (state, action) => {
      // state.isLoading = false;
      state.selectPromise = { promise: action.payload, toggle: true };
    },
    [__getPromise.rejected]: (state) => {
      // state.isLoading = false;
    },

    [__addPromise.pending]: (state) => {
      state.isLoading = true;
    },
    [__addPromise.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [__addPromise.rejected]: (state) => {
      state.isLoading = false;
    },

    [__deletePromise.pending]: (state) => {
      state.isLoading = true;
    },
    [__deletePromise.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [__deletePromise.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { resetPromiseState, setAddData, resetAddData, detatilToggle } = promiseSlice.actions;
export default promiseSlice.reducer;
