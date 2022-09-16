import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { IconBtn, TextBox, MoveTopModal, Btn, RoundBtn } from "components/common";
import { GeoIcon, PinIcon, BookMarkIcon, LeftArrowIcon } from "assets/icons";
import { toggleViewMiddle, toggleViewPlace } from "store/modules/promiseSlice";
import { setCenter } from "garbage/mapSlice";
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
      <BtnArea>
        {!viewPlace ? (
          <>
            <RoundBtn
              selected={true}
              onClick={() => {
                dispatch(toggleViewMiddle());
              }}
            >
              <span className="icon">
                <PinIcon />
              </span>
              <span className="text">중간은 어디?</span>
            </RoundBtn>
            <IconBtn
              onClick={() => {
                dispatch(setCenter(true));
              }}
            >
              <GeoIcon />
            </IconBtn>
          </>
        ) : (
          <BackBtn onClick={() => (viewPlace ? dispatch(toggleViewPlace(false)) : null)}>
            <LeftArrowIcon />
          </BackBtn>
        )}
      </BtnArea>

      <Section>
        <PlaceTitle onClick={() => (!viewPlace ? dispatch(toggleViewPlace(true)) : null)} viewPlace={viewPlace}>
          <TextBox>
            <p className="title">{placeList[selected]?.name}</p>
            <p>{placeList[selected]?.category}</p>
          </TextBox>
          <span>
            <BookMarkIcon />
          </span>
        </PlaceTitle>
        <PlaceInfo>
          <p>{placeList[selected]?.address}</p>
          <p>{placeList[selected]?.phone}</p>
          <img src={imgUrl[0]} alt="이미지가 없습니다" />
        </PlaceInfo>
        <Btn outLine={true}>여기로 약속잡기</Btn>
      </Section>
    </MoveTopModal>
  );
};

export default memo(MarkerDetailModal);

const BtnArea = styled.div`
  display: flex;
  justify-content: space-between !important;

  height: ${(props) => props.theme.lineHeight};
  padding: ${(props) => props.theme.size.m};
`;

const Section = styled.div`
  padding: calc(${(props) => props.theme.size.xs} * 2);
  background: white;
  height: 100%;
  border-radius: ${(props) => props.theme.size.m} ${(props) => props.theme.size.m} 0 0;
  box-shadow: 0px -4px 10px rgba(17, 24, 39, 0.15);
`;

const BackBtn = styled(IconBtn)`
  svg {
    width: ${(props) => props.theme.size.s};
    height: ${(props) => props.theme.size.s};
  }
`;

const PlaceTitle = styled.div`
  cursor: ${(props) => (props.viewPlace ? "inherit" : "pointer")};
  display: flex;
  justify-content: space-between;
  min-height: 4.5rem;
  margin-bottom: calc(${(props) => props.theme.size.xs} * 2);
`;

const PlaceInfo = styled.div`
  height: 75%;
  border-radius: ${(props) => props.theme.size.s};
  background: ${(props) => props.theme.color.disable};
  margin-bottom: ${(props) => props.theme.size.xs};
  img {
    width: 100%;
  }
`;
