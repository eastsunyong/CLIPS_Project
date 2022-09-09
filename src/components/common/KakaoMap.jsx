import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

import { resetState, setCenter } from "store/modules/mapSlice";
import { toggleViewTitle } from "store/modules/homeSlice";
import _ from "lodash";

const { kakao } = window;
const KakaoMap = () => {
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
    <Container ref={map} level={4} center={mapInfo.coord} isPanto={true} onDrag={_.debounce(mapDragHandler, 100)}>
      {mapInfo.markers.map((marker, i) => {
        if (marker.category === "center") {
          return (
            <CustomOverlayMap key={marker.coord.lat + marker.coord.lng} position={marker.coord}>
              <CustomOverlay className="fcc">
                <span>{marker.name}</span>
              </CustomOverlay>
            </CustomOverlayMap>
          );
        }
        return (
          <MapMarker key={marker.coord.lat + marker.coord.lng} position={marker.coord} clickable={true} onClick={() => markerClickHandler(i - 1)} />
        );
      })}
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

const CustomOverlay = styled.div`
  width: ${(props) => props.theme.size.l};
  height: ${(props) => props.theme.size.m};
  background: white;
  font-size: ${(props) => props.theme.fontSize.s};
`;
