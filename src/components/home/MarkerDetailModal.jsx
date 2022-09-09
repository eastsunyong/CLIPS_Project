import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";

import { MoveTopModal } from "components/common/modal";
import { Btn } from "components/common";
import { GeoIcon, PinIcon, BookMarkIcon } from "assets/icons";
import { toggleViewMiddle, toggleViewPlace } from "store/modules/homeSlice";
import { setCenter } from "store/modules/mapSlice";
import { axios } from "utils";

const MarkerDetailModal = () => {
  const dispatch = useDispatch();
  const viewPlace = useSelector((state) => state.home.viewPlace);
  const viewTitle = useSelector((state) => state.home.viewTitle);
  const placeList = useSelector((state) => state.home.placeList);
  const selected = useSelector((state) => state.home.selected);
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    if (placeList[selected]) {
      axios.default.post("/main/crawl", { placeUrl: placeList[selected].url }).then((res) => {
        setImgUrl(res.data.data);
      });
    }
  }, [placeList[selected]]);

  return (
    <MoveTopModal toggle={viewPlace} pathname="/" viewTitle={viewTitle}>
      <BtnArea className="fcc">
        {!viewPlace ? (
          <>
            <GetMiddleBtn
              onClick={() => {
                dispatch(toggleViewMiddle());
              }}
            >
              <PinIcon />
              <span>중간은 어디?</span>
            </GetMiddleBtn>
            <CustomBtn
              onClick={() => {
                dispatch(setCenter(true));
              }}
            >
              <GeoIcon />
            </CustomBtn>
          </>
        ) : (
          <CustomBtn onClick={() => (viewPlace ? dispatch(toggleViewPlace(false)) : null)}>
            <IoIosArrowBack />
          </CustomBtn>
        )}
      </BtnArea>

      <Section>
        <Title onClick={() => (!viewPlace ? dispatch(toggleViewPlace(true)) : null)} viewPlace={viewPlace}>
          <div className="fcc">
            <p>{placeList[selected]?.name}</p>
            <span>
              <BookMarkIcon />
            </span>
          </div>
          <div>
            <p>{placeList[selected]?.category}</p>
          </div>
        </Title>
        <PlaceInfo className="fcc">
          <p>{placeList[selected]?.address}</p>
          <p>{placeList[selected]?.phone}</p>
          <img src={imgUrl[0]} alt="이미지가 없습니다" />
        </PlaceInfo>
        <SubmitBtn>여기로 약속잡기</SubmitBtn>
      </Section>
    </MoveTopModal>
  );
};

export default memo(MarkerDetailModal);

const BtnArea = styled.div`
  height: calc(${(props) => props.theme.size.m} * 2);
  padding: ${(props) => props.theme.size.s} calc(${(props) => props.theme.size.s} * 2);
  justify-content: space-between !important;
`;

const CustomBtn = styled(Btn)`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: bold;

  padding: ${(props) => props.theme.size.s};
  border-radius: ${(props) => props.theme.size.m};

  & > :first-child {
    width: ${(props) => props.theme.fontSize.s};
    height: ${(props) => props.theme.fontSize.s};
  }
`;

const GetMiddleBtn = styled(CustomBtn)`
  background: ${(props) => props.theme.themeColor};
  & > :first-child {
    margin-right: calc(${(props) => props.theme.size.s} / 2);
  }
  & > * {
    filter: invert(100%);
  }
`;

const Section = styled.div`
  padding: ${(props) => props.theme.size.s} calc(${(props) => props.theme.size.s} * 2);
  background: white;
  height: 100%;
  border-radius: ${(props) => props.theme.size.m} ${(props) => props.theme.size.m} 0 0;
  box-shadow: 0px -4px 10px rgba(17, 24, 39, 0.15);
  & > * {
    width: 100%;
    margin-bottom: ${(props) => props.theme.size.s};
  }
  & > :first-child {
    padding-top: ${(props) => props.theme.size.s};
  }
`;

const Title = styled.div`
  cursor: ${(props) => (props.viewPlace ? "inherit" : "pointer")};
  height: calc(${(props) => props.theme.size.m} * 2);
  font-size: calc(${(props) => props.theme.fontSize.s} * 0.8);
  & > :first-child {
    justify-content: space-between !important;
  }
  & > :first-child > p {
    color: black;
    font-size: ${(props) => props.theme.fontSize.s};
    font-weight: bold;
    margin-bottom: calc(${(props) => props.theme.size.s} / 2);
  }
  p {
    color: ${(props) => props.theme.disableColor};
  }
`;

const PlaceInfo = styled.div`
  flex-flow: column;
  height: 75%;
  border-radius: ${(props) => props.theme.size.s};
  background: ${(props) => props.theme.disableColor};
  img {
    width: 100%;
  }
`;

const SubmitBtn = styled.button`
  height: ${(props) => props.theme.size.m};

  border: 0.1rem solid ${(props) => props.theme.themeColor};
  border-radius: ${(props) => props.theme.size.s};
  background: white;

  font-weight: bold;
  color: ${(props) => props.theme.themeColor};
`;
