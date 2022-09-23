import React, { memo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Btn, Modal, PageTop, TextBox } from "components/common";
import { LeftArrowIcon } from "assets/iconList";
import MiddleMap from "./MiddleMap";
import { setPlace } from "store/modules/promiseSlice";

const ViewMiddleModal = (props) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  // 전역에 address 등록
  const savePlace = () => {
    const place = {
      name: props.locationList.middleLocation.address,
      address: props.locationList.middleLocation.address,
      coord: props.locationList.middleLocation.coord,
    };
    dispatch(setPlace(place));
    nav("/promised", { state: { setAddress: true } });
  };
  return (
    <Section toggle={props.toggle}>
      <Top>
        <div>
          <span
            className="icon"
            onClick={() => {
              props.setToggle(!props.toggle);
            }}
          >
            <LeftArrowIcon />
          </span>
          <span className="title">우리의 중간 장소 결과보기</span>
        </div>
      </Top>
      <Bottom>
        <TextBox>
          <div className="title">{props.locationList?.middleLocation.address}</div>
        </TextBox>
        <Btn outLine={true} onClick={savePlace}>
          여기로 약속 잡기
        </Btn>
      </Bottom>
      <MiddleMap locationList={props.locationList} />
    </Section>
  );
};

export default memo(ViewMiddleModal);

const Section = styled(Modal)`
  #subMap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const Top = styled(PageTop)`
  position: absolute;
  top: 0;
  z-index: ${(props) => props.theme.level.front.low};

  background: white;
  box-shadow: 0 1rem 1rem rgba(17, 24, 39, 0.15);
`;

const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  z-index: ${(props) => props.theme.level.front.low};

  width: 100%;
  padding: calc(${(props) => props.theme.size.xs} * 2);

  background: white;
  border-radius: ${(props) => props.theme.size.m} ${(props) => props.theme.size.m} 0 0;
  box-shadow: 0 -0.4rem 1rem rgba(17, 24, 39, 0.15);

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    margin: ${(props) => props.theme.size.m} 0;
  }
`;
