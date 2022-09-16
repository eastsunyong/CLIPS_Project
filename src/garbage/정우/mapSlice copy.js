import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { localAPI } from "apis";
import { toggleViewTitle } from "store/modules/promiseSlice";

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

// 마커 이미지 생성
const _createMakerImg = () => {
  const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
  const imageSize = new kakao.maps.Size(64, 69);
  const imageOption = { offset: new kakao.maps.Point(27, 69) };
  // 마커 이미지 옵션
  // alt String : 마커 이미지의 alt 속성값을 정의한다.
  // coords String : 마커의 클릭 또는 마우스오버 가능한 영역을 표현하는 좌표값
  // offset Point : 마커의 좌표에 일치시킬 이미지 안의 좌표 (기본값: 이미지의 가운데 아래)
  // shape String : 마커의 클릭 또는 마우스오버 가능한 영역의 모양
  // spriteOrigin Point : 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
  // spriteSize Size : 스프라이트 이미지의 전체 크기
  return new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
};

// 마커 생성
const _createMaker = (x, y) => {
  const markerOpt = {
    position: _createLatLon(x, y),
    image: _createMakerImg(),
    clickable: true, // 마커 클릭시 지도 클릭이벤트는 막기
  };
  return new kakao.maps.Marker(markerOpt);
};

// 정크
export const setAddress2coord = createAsyncThunk("ADDRESS2COORD", async (payload, api) => {
  try {
    const answer = await localAPI.coordTransfer(payload);
    const marker = _createMaker(answer.x, answer.y);
    kakao.maps.event.addListener(marker, "click", () => {
      // api.dispatch(toggleViewTitle());
    });
    return api.fulfillWithValue({ coord: { x: answer.x, y: answer.y }, marker });
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
  placeMarkers: [],
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
        x: action.payload.coord.x,
        y: action.payload.coord.y,
      };
      state.markers = [action.payload.marker, ...state.markers];
    },
    [setAddress2coord.rejected]: (state) => {
      state = initialState;
      console.log("카카오 에러 발생!");
    },
  },
});

export const { setMap, resetMap } = mapSlice.actions;
export default mapSlice.reducer;
