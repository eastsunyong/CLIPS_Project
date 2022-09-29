import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axios } from "utils";

const initialState = {
  // 카테고리
  categoryList: ["음식점", "카페", "술집", "헬스장", "운동장"],
  selectedCg: ["음식점"],

  // 선택 장소 상세 데이터
  placeInfo: null,

  // 맵 센터 이동 제어
  isCenter: false,

  // 각각 모달 토글(검색창 제외)
  infoView: false,
  middleView: false,
};

export const __setPlaceImg = createAsyncThunk("setPlaceImg", async (payload, api) => {
  try {
    api.dispatch(setPlaceInfo(payload));

    const res = await axios.default.post("/main/crawlAll", { placeUrl: payload.placeUrl });
    const data = res.data.data;

    return { time: data.crawlTimeData1, img: data.crawlingUrllist };
  } catch (err) {}
});

export const mainSlice = createSlice({
  name: "PAGE/MAIN",
  initialState,
  reducers: {
    resetMainState: () => initialState,
    setSelectedCg: (state, action) => {
      if (state.selectedCg.find((x) => x === action.payload)) {
        state.selectedCg = state.selectedCg.filter((cg) => cg !== action.payload);
      } else {
        state.selectedCg = [...state.selectedCg, action.payload];
      }
    },
    setPlaceInfo: (state, action) => {
      state.placeInfo = action.payload;
    },
    moveCenter: (state) => {
      state.isCenter = !state.isCenter;
    },
    infoToggle: (state) => {
      state.infoView = !state.infoView;
    },
    middleToggle: (state) => {
      state.middleView = !state.middleView;
    },
  },
  extraReducers: {
    [__setPlaceImg.fulfilled]: (state, action) => {
      state.placeInfo = { ...state.placeInfo, ...action.payload };
    },
    [__setPlaceImg.rejected]: () => {
      console.log("__setPlaceImg 에러 발생!");
    },
  },
});

export const { resetMainState, setSelectedCg, setPlaceInfo, moveCenter, infoToggle, middleToggle } = mainSlice.actions;
export default mainSlice.reducer;
