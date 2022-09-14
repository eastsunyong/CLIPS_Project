import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { _createLatLon, setMap, resetMap } from "garbage/mapSlice";

const { kakao } = window;
const Map = () => {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const map = useSelector((state) => state.map.map);
  const coord = useSelector((state) => state.map.coord);
  const markers = useSelector((state) => state.map.markers);

  // 맵생성
  useEffect(() => {
    dispatch(setMap(mapRef.current));
    return () => {
      dispatch(resetMap());
    };
  }, []);

  // 좌표 바뀌면 이동
  useEffect(() => {
    if (map) {
      map.panTo(_createLatLon(coord.x, coord.y));
    }
  }, [coord]);

  // marker 맵 등록
  useEffect(() => {
    if (map) {
      markers.forEach((marker, i) => {
        if (i === 0) {
          marker.setMap(map);
        } else {
          marker.setMap(null);
        }
      });
    }
  }, [markers]);

  return <Container ref={mapRef} className="map" />;
};

export default Map;

const Container = styled.div`
  width: 100%;
  height: 100%;
  & > div:nth-last-child(2) {
    display: none;
  }
`;
