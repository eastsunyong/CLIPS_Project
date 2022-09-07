import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { localAPI } from "apis";

const { kakao } = window;

// _는 액션 함수가 아닌 일반 카카오 함수
// 카카오 좌표로 변경
export const _createLatLon = (x, y) => {
  return new kakao.maps.LatLng(y, x);
};

// 맵 생성
const _createMap = (target, x, y) => {
  const mapOpt = {
    center: _createLatLon(x, y),
    level: 7,
  };
  return new kakao.maps.Map(target, mapOpt);
};

// 마커 생성
const _createMaker = (x, y) => {
  const markerOpt = {
    position: _createLatLon(x, y),
  };
  return new kakao.maps.Marker(markerOpt);
};

// 정크
export const setAddress2coord = createAsyncThunk("ADDRESS2COORD", async (payload, api) => {
  try {
    const answer = await localAPI.coordTransfer(payload);
    return api.fulfillWithValue({ x: answer.x, y: answer.y });
  } catch (err) {
    return api.rejectWithValue();
  }
});

// 슬라이스
const initialState = {
  map: null,
  coord: {
    x: 126.570667,
    y: 33.450701,
  },
  markers: [],
};

export const mapSlice = createSlice({
  name: "MAP",
  initialState,
  reducers: {
    setMap: (state, action) => {
      state.map = _createMap(action.payload, state.coord.x, state.coord.y);
    },
    resetMap: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    [setAddress2coord.fulfilled]: (state, action) => {
      state.coord = {
        x: action.payload.x,
        y: action.payload.y,
      };
      state.markers = [_createMaker(action.payload.x, action.payload.y), ...state.markers];
    },
    [setAddress2coord.rejected]: (state) => {
      state = initialState;
      console.log("카카오 에러 발생!");
    },
  },
});

export const { setMap, resetMap } = mapSlice.actions;
export default mapSlice.reducer;
