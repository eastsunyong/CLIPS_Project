import React, { memo } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Btn, Modal, Pagefield } from "components/common";
import { LeftArrow } from "assets/icons";
import { setPlace } from "store/modules/promiseSlice";
import MiddleMap from "./MiddleMap";

const ViewMiddleModal = ({ locationList, viewToggle, setViewToggle }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  // 전역에 address 등록
  const savePlace = () => {
    const place = {
      name: locationList.middle.address,
      address: locationList.middle.address,
      coord: locationList.middle.coord,
    };
    dispatch(setPlace(place));
    nav("/promised", { state: { setAddress: true } });
  };

  return (
    <CustomModal toggle={viewToggle}>
      <Pagefield
        icon={
          <div
            className="btn"
            onClick={() => {
              setViewToggle(!viewToggle);
            }}
          >
            <LeftArrow className="sm" />
          </div>
        }
        title="우리의 중간 장소 결과보기"
      >
        <MiddleMap locationList={locationList} />
        <Bottom>
          <div className="title">{locationList.middle?.address}</div>
          <Btn outLine={true} onClick={savePlace}>
            여기로 약속 잡기
          </Btn>
        </Bottom>
      </Pagefield>
    </CustomModal>
  );
};

export default memo(ViewMiddleModal);

const CustomModal = styled(Modal)`
  #subMap {
    position: absolute;
    left: 0;
    right: 0;
  }
`;

const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: ${(props) => props.theme.level.front.low};

  width: 100%;
  padding: 2rem;

  background: white;
  border-radius: 1.6rem 1.6rem 0 0;
  box-shadow: 0 -0.4rem 1rem rgba(17, 24, 39, 0.15);

  .title {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.6rem;
    font-weight: bold;
  }

  button {
    margin: 1.6rem 0;
  }
`;
