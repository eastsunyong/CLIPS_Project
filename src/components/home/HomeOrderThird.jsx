import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { Container } from "./HomeCommonStyle";
import LocationSearchModal from "./LocationSearchModal";
import { localAPI } from "apis";

const { kakao } = window;
const HomeOrderThird = (props) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [coord, setCoord] = useState({
    x: null,
    y: null,
  });
  const { handleSubmit, register, setValue, watch, getValues } = useForm();
  const [toggle, setToggle] = useState(false);
  const [target, setTarget] = useState(null);

  // 맵 생성
  const createMap = () => {
    const mapOpt = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 7,
    };
    const newMap = new kakao.maps.Map(mapRef.current, mapOpt);
    newMap.setZoomable(false);
    setMap(newMap);
  };
  useEffect(() => {
    createMap();
  }, []);

  // 주소받으면 좌표 세팅해주는 함수
  const changeCoord = async (address) => {
    const answer = await localAPI.coordTransfer(address);
    setCoord({ x: answer.x, y: answer.y });
  };

  // 2단계에서 정해진 지역이 있으면 좌표 셋팅
  useEffect(() => {
    if (props.selected) changeCoord(props.selected);
  }, [props.selected]);

  // 새로 입력시 좌표 변경 => 위 이펙트와 동일한 유형이라서 합칠 예정
  useEffect(() => {
    if (getValues("search")) changeCoord(getValues("search"));
  }, [getValues("search")]);

  // 좌표 변경 시 map center 이동, maker 생성
  useEffect(() => {
    if (coord.x) {
      const moveLatLon = new kakao.maps.LatLng(coord.y, coord.x);
      const marker = new kakao.maps.Marker({
        position: moveLatLon,
      });
      setMarkers([marker, ...markers]);
      map.panTo(moveLatLon);
    }
  }, [coord]);

  useEffect(() => {
    markers.forEach((marker, i) => {
      if (i === 0) marker.setMap(map);
      else marker.setMap(null);
    });
  }, [markers]);

  // 모달 오픈 => 2페이지와 동일한 것으로 합칠 예정
  const modalOpen = (e) => {
    const name = e.target.name;
    setTarget(name);
    setToggle(true);
  };

  const submitCallback = (data) => {
    changeCoord(data.search);
  };

  const registerOpt = {
    required: "검색어를 입력해주세요",
  };

  return (
    <CustomContainer>
      <SearchArea className="fcc" onSubmit={handleSubmit(submitCallback)}>
        <input {...register("search", registerOpt)} placeholder="주소를 입력해주세요" onClick={modalOpen} defaultValue={props.selected} />
      </SearchArea>
      <Map ref={mapRef} />
      <LocationSearchModal toggle={toggle} setToggle={setToggle} target={target} setValue={setValue} />
    </CustomContainer>
  );
};

const CustomContainer = styled(Container)`
  padding: 2rem;
  background: white;
`;

const Map = styled.div`
  width: 100%;
  height: 50%;
`;

const SearchArea = styled.form`
  position: sticky;
  top: 0;
  background: white;
  box-shadow: 0 0.3rem 0.3rem -0.3rem;
  padding: 1rem;
  & > * {
    height: 5rem;
  }
  input {
    margin: 0 2rem;
    padding: 1rem;
    flex: 1;
    font-size: 2rem;
  }
`;

export default HomeOrderThird;
