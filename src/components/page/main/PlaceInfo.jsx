import React, { memo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import _ from "lodash";

import { Btn, Card } from "components/common";
import { Location, OutlineStar, Phone, Time } from "assets/icons";
import { setAddData } from "store/modules/promiseSlice";
import { infoToggle, resetMainState } from "store/modules/mainSlice";
import { imgLoading, imgNull } from "assets/img";
import { useXDrag } from "hooks";

const PlaceInfo = ({ placeInfo }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [ref, start, end, moving] = useXDrag();

  // 전역에 address 등록
  const savePlace = () => {
    const place = {
      name: placeInfo.name,
      address: placeInfo.road_address ? placeInfo.road_address : placeInfo.address,
      coord: placeInfo.coord,
    };
    dispatch(setAddData({ place }));
    dispatch(resetMainState());
    nav("/promised", { state: { setAddress: true } });
  };

  return (
    <Section>
      <CustomCard
        onClick={() => {
          dispatch(infoToggle());
        }}
      >
        <div className="cardTitle">
          {placeInfo?.name}
          {/* <div>
            <OutlineStar className="md" />
          </div> */}
        </div>
        <div>{placeInfo?.detailCategory}</div>
      </CustomCard>

      <ImgList ref={ref} onMouseDown={start} onMouseMove={_.throttle(moving, 50)} onMouseUp={end} onMouseLeave={end}>
        {placeInfo?.img ? (
          placeInfo.img.length > 0 ? (
            placeInfo.img.map((url) => {
              return <img key={url} src={url} alt="가게 이미지" />;
            })
          ) : (
            <img src={imgNull} alt="이미지 없음 이미지" />
          )
        ) : (
          <img src={imgLoading} alt="로딩 이미지" />
        )}
      </ImgList>

      <CustomCard>
        <div>
          <div className="contentIcon">
            <Location className="md" />
          </div>
          <div className="content">{placeInfo?.road_address ? placeInfo?.road_address : placeInfo?.address}</div>
        </div>
        <div>
          <div className="contentIcon">
            <Phone className="md" />
          </div>
          <div className="content">{placeInfo?.phone ? placeInfo.phone : "연락처를 확인할 수 없어요!"}</div>
        </div>
        <div>
          <div className="contentIcon">
            <Time className="md" />
          </div>
          <div className="content">{placeInfo?.time ? placeInfo.time[0] : "영업시간을 확인할 수 없어요!"}</div>
        </div>
      </CustomCard>

      <Btn outLine={true} onClick={savePlace}>
        여기로 약속잡기
      </Btn>
    </Section>
  );
};

export default memo(PlaceInfo);

const Section = styled.section`
  flex: 1;
  padding: 2rem;

  border-radius: 1.6rem 1.6rem 0 0;
  box-shadow: 0 -0.4rem 1rem rgba(17, 24, 39, 0.15);
  background: white;

  &::-webkit-scrollbar {
    display: none;
  }
  & > * {
    margin-bottom: 2rem;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
`;

const CustomCard = styled(Card)`
  padding: 0;
  box-shadow: none;
  .cardTitle {
    font-size: 2rem;
    & > div {
      color: ${(props) => props.theme.color.disable};
    }
  }
  .content {
    color: black;
    font-size: 1.4rem;
  }
`;

const ImgList = styled.div`
  cursor: pointer;
  display: flex;
  overflow: scroll;

  img {
    width: 100%;
    height: 18rem;
    border-radius: 1.2rem;
    -webkit-user-drag: none;
  }

  img:not(:first-child) {
    margin-left: 1.2rem;
  }
`;
