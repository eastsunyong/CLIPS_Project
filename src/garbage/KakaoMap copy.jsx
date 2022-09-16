import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";

import { resetState, setCenter } from "garbage/mapSlice";
import { toggleViewTitle } from "store/modules/homeSlice";
import _ from "lodash";

const { kakao } = window;
const KakaoMap = (props) => {
  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const map = useRef(null);
  const mapInfo = useSelector((state) => state.map);

  // 페이지 이동(컴포넌트 삭제)시 전역상태 초기화
  useEffect(() => {
    return () => dispatch(resetState());
  }, []);

  // 센터 이동
  // 공식문서상의 바닐라js 방식으로 사용
  useEffect(() => {
    if (map.current && mapInfo.isCenter) {
      map.current.panTo(new kakao.maps.LatLng(mapInfo.coord.lat, mapInfo.coord.lng));
    }
  }, [mapInfo.isCenter]);

  // 맵 드래그 이벤트
  // 드래그는 이동 중 계속 이벤트가 발생하여 로우대쉬의 디바운스 사용
  const mapDragHandler = () => {
    if (pathname === "/") {
      dispatch(toggleViewTitle({ index: -1, toggle: false }));
      dispatch(setCenter(false));
    }
  };

  // 마커 클릭 이벤트
  const markerClickHandler = (index) => {
    if (pathname === "/") dispatch(toggleViewTitle({ index, toggle: true }));
  };

  return (
    <Container ref={map} level={12} center={mapInfo.coord} isPanto={true} onDrag={_.debounce(mapDragHandler, 100)}>
      <MarkerClusterer
        averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel={5} // 클러스터 할 최소 지도 레벨
      >
        {mapInfo.markers.map((marker, i) => {
          if (marker.category === "center") {
            return (
              <MapMarker
                key={`${marker.coord.lat}-${marker.coord.lng}`}
                position={marker.coord}
                clickable={true}
                onClick={() => markerClickHandler(i - 1)}
              />
            );
          }
          return (
            <MapMarker key={marker.coord.lat + marker.coord.lng} position={marker.coord} clickable={true} onClick={() => markerClickHandler(i - 1)} />
          );
        })}
      </MarkerClusterer>
    </Container>
  );
};

export default memo(KakaoMap);

const Container = styled(Map)`
  width: 100%;
  height: 100%;
  & > div:nth-last-child(2) {
    display: none;
  }
`;
