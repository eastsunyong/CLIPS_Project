import React, { useRef, useEffect, useState, memo } from "react";
import styled from "styled-components";

import { localAPI } from "apis";

const { kakao } = window;
const Map = (props) => {
  // 사용법 (props 내역)
  // center : boolean => 기준점으로 이동
  // address : string => 기준점 변경

  const containerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [coord, setCoord] = useState({
    x: 126.570667,
    y: 33.450701,
  });

  // 주소받으면 좌표로 변환 및 상태 기입해주는 함수
  const changeCoord = async (address) => {
    const answer = await localAPI.coordTransfer(address);
    setCoord({ x: answer.x, y: answer.y });
  };

  // 설정 좌표로 이동 함수
  const moveCoord = (x, y) => {
    const moveLatLon = new kakao.maps.LatLng(y, x);
    map.panTo(moveLatLon);
  };

  // 마커 생성 및 마커 관리용 상태값에 기입
  const createMaker = (x, y) => {
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(y, x),
    });
    setMarkers([marker, ...markers]);
  };

  // 1. 맵생성
  // 2. 좌표 변경 시 map center 이동, maker 생성
  useEffect(() => {
    if (coord.x === 126.570667) {
      const mapOpt = {
        center: new kakao.maps.LatLng(coord.y, coord.x),
        level: 7,
      };
      const newMap = new kakao.maps.Map(containerRef.current, mapOpt);
      setMap(newMap);
    } else {
      moveCoord(coord.x, coord.y);
      createMaker(coord.x, coord.y);
    }
  }, [coord]);

  // 주소 입력받으면 좌표 변경
  useEffect(() => {
    if (props.address) changeCoord(props.address);
  }, [props.address]);

  // 마커 세팅
  useEffect(() => {
    markers.forEach((marker, i) => {
      if (i === 0) marker.setMap(map);
      else marker.setMap(null);
    });
  }, [markers]);

  // 기준점으로 이동 버튼
  useEffect(() => {
    if (props.center) {
      moveCoord(coord.x, coord.y);
      props.setCenter(!props.center);
    }
  }, [props.center]);

  return <Container ref={containerRef} />;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  & > div:nth-last-child(2) {
    display: none;
  }
`;

export default memo(Map);
