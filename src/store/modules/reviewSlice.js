import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import imageCompression from "browser-image-compression";

import { reviewAPI } from "apis";
import { __getPromiseList } from "./promiseSlice";

// 리스트 조회
export const __getReviewList = createAsyncThunk("__getReviewList", async (payload, api) => {
  const answer = await reviewAPI.getList();
  if (answer.result) {
    return api.fulfillWithValue(answer.list);
  } else {
    return api.rejectWithValue();
  }
});

// 리뷰 추가
export const __addReview = createAsyncThunk("__addReview", async (payload, api) => {
  const formData = new FormData();
  formData.append("content", payload.data.content);

  const opt = {
    maxSizeMB: 1,
    maxWidthOrHeight: 500,
  };

  for (let i = 0; i < payload.data.image.length; i++) {
    const compressBlob = await imageCompression(payload.data.image[i], opt);
    const compressFile = new File([compressBlob], payload.data.image[i].name, { type: "image/png" });
    formData.append("image", compressFile);
  }

  const answer = await reviewAPI.addReview(payload.promiseId, formData);

  if (answer.result) {
    api.dispatch(__getPromiseList());
    return api.fulfillWithValue();
  } else {
    return api.rejectWithValue();
  }
});

// 리뷰 삭제
export const __deleteReview = createAsyncThunk("__deleteReview", async (payload, api) => {
  const answer = await reviewAPI.deleteReview(payload);

  if (answer.result) {
    api.dispatch(__getPromiseList());
    api.dispatch(__getReviewList());
    return api.fulfillWithValue();
  } else {
    return api.rejectWithValue();
  }
});

const initialState = {
  isLoading: false,
  reviewList: [],
  selectPromise: { toggle: false, promise: null },
  type: true,
};

export const reviewSlice = createSlice({
  name: "PAGE/REVIEW",
  initialState,
  reducers: {
    resetReviewState: () => initialState,
    startWriteReview: (state, action) => {
      state.selectPromise = { toggle: true, promise: action.payload };
    },
    endWriteReview: (state) => {
      state.selectPromise = { ...state.selectPromise, toggle: false };
    },
    typeToggle: (state) => {
      state.type = !state.type;
    },
  },
  extraReducers: {
    [__getReviewList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getReviewList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.reviewList = action.payload;
    },
    [__getReviewList.rejected]: (state) => {
      state.isLoading = false;
    },

    [__addReview.pending]: (state) => {
      state.isLoading = true;
    },
    [__addReview.fulfilled]: (state) => {
      state.isLoading = false;
      state.selectPromise = { ...state.selectPromise, toggle: false };
      // state.type = !state.type;
    },
    [__addReview.rejected]: (state) => {
      state.isLoading = false;
    },

    [__deleteReview.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteReview.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [__deleteReview.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { resetReviewState, startWriteReview, endWriteReview, typeToggle } = reviewSlice.actions;
export default reviewSlice.reducer;
