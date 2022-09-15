import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { localAPI } from "apis";

export const setAddress2coord = createAsyncThunk("ADDRESS2COORD", async (payload, api) => {
  try {
    const answer = await localAPI.coordTransfer(payload);
    return api.fulfillWithValue({ lat: answer.y, lng: answer.x });
  } catch (err) {
    return api.rejectWithValue();
  }
});

const initialState = {
  coord: { lat: 37.5023270151927, lng: 127.044444694599 },
  isCenter: true,
  markers: [],
};

export const mapSlice = createSlice({
  name: "MAP",
  initialState,
  reducers: {
    resetState: () => initialState,
    setCoord: (state, action) => {
      state.coord = action.payload.coord;
      state.markers = action.payload.markers;
    },
    setCenter: (state, action) => {
      state.isCenter = action.payload;
    },
  },
  extraReducers: {
    [setAddress2coord.fulfilled]: (state, action) => {
      state.coord = action.payload;
    },
    [setAddress2coord.rejected]: () => {
      console.log("카카오 에러 발생!");
    },
  },
});

export const { resetState, setCoord, setCenter } = mapSlice.actions;
export default mapSlice.reducer;
