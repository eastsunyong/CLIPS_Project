import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const { kakao } = window;
const Map = () => {
  const containerRef = useRef(null);
  const [map, setMap] = useState(null);

  // 맵 생성
  useEffect(() => {
    const mapOpt = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 7,
    };
    const newMap = new kakao.maps.Map(containerRef.current, mapOpt);
    newMap.setZoomable(false);
    setMap(newMap);
  }, []);

  return <Container ref={containerRef} />;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  & > div:nth-last-child(2) {
    display: none;
  }
`;

export default Map;
