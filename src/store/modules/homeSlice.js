import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { axios } from "utils";
import { localAPI } from "apis";

export const setPlaceList = createAsyncThunk("RECOMMENDLIST", async (payload, api) => {
  try {
    let markers = [];
    let placeList = [];

    const kakaoAnswer = await localAPI.coordTransfer(payload);
    const coord = { lat: kakaoAnswer.y, lng: kakaoAnswer.x };
    markers.push({ name: "기준점입니다.", category: "center", coord: { lat: kakaoAnswer.y, lng: kakaoAnswer.x } });

    const beAnswer = await axios.default.post("/main", { location: payload });
    const list = beAnswer.data.data.data;

    if (list) {
      list.forEach((place) => {
        markers.push({ name: place.place, category: place.category, coord: { lat: place.y, lng: place.x } });
        placeList.push({ name: place.place, address: place.address, category: place.category, phone: place.phone, url: place.placeUrl });
      });
    }
    // BE 메시지
    // console.log(answer.data.data.msg);

    // api.dispatch(setCoord({ coord, markers }));
    return api.fulfillWithValue(placeList);
  } catch (err) {
    console.log(err);
    return api.rejectWithValue();
  }
});

const initialState = {
  address: null,
};

export const homeSlice = createSlice({
  name: "PAGE/HOME",
  initialState,
  reducers: {
    resetState: () => initialState,
    setAddress: (state, action) => {
      state.address = action.payload;
      state.viewPlace = false;
      state.viewTitle = false;
    },
  },
  extraReducers: {
    [setPlaceList.fulfilled]: (state, action) => {
      state.placeList = action.payload;
    },
    [setPlaceList.rejected]: () => {
      console.log("setPlaceList 에러 발생!");
    },
  },
});

export const { resetState, setAddress } = homeSlice.actions;
export default homeSlice.reducer;
