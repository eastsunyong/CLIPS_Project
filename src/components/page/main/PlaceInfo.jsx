import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Btn, TextBox, XDragList } from "components/common";
import { LocationIcon, PhoneIcon, StarIcon } from "assets/icons";
import { axios } from "utils";
import { setPlace } from "store/modules/promiseSlice";
import imgLoading from "assets/img/imgLoading.png";
import imgEmpty from "assets/img/imgNull.png";

const PlaceInfo = (props) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [crawlData, setCrawlData] = useState(null);

  useEffect(() => {
    setCrawlData(null);
    if (props.placeInfo) {
      axios.default.post("/main/crawlAll", { placeUrl: props.placeInfo.placeUrl }).then((res) => {
        setCrawlData(res.data.data);
      });
    }
  }, [props.placeInfo]);

  // 전역에 address 등록
  const savePlace = () => {
    const place = {
      name: props.placeInfo.name,
      address: props.placeInfo.road_address ? props.placeInfo.road_address : props.placeInfo.address,
      coord: props.placeInfo.coord,
    };
    dispatch(setPlace(place));
    nav("/promised", { state: { setAddress: true } });
  };

  return (
    <Section>
      <Title
        cursor={props.infoToggle ? "auto" : "pointer"}
        onClick={() => {
          if (!props.infoToggle) {
            props.setInfoToggle(!props.infoToggle);
          }
        }}
      >
        <div>
          <div className="title">{props.placeInfo?.name}</div>
          <div>{props.placeInfo?.detailCategory}</div>
        </div>
        <div className="icon">
          <StarIcon />
        </div>
      </Title>
      <ImgArea>
        <XDragList>
          {crawlData && crawlData.crawlingUrllist ? (
            crawlData.crawlingUrllist.length > 0 ? (
              crawlData.crawlingUrllist.map((url) => {
                return <img key={url} src={url} />;
              })
            ) : (
              <img src={imgEmpty} />
            )
          ) : (
            <img src={imgLoading} />
          )}
        </XDragList>
      </ImgArea>
      <Info>
        <div>
          <span className="icon">
            <LocationIcon />
          </span>
          <span>{props.placeInfo?.address}</span>
        </div>
        <div>
          <span className="icon">
            <PhoneIcon />
          </span>
          <span>{props.placeInfo?.phone ? props.placeInfo?.phone : "연락처가 없어요!"}</span>
        </div>
        <div>
          <span className="icon">
            <LocationIcon />
          </span>
          <span>{crawlData?.rawArrDateUrl ? crawlData?.rawArrDateUrl : "영업시간을 확인할 수 없습니다!"}</span>
        </div>
      </Info>
      <Btn outLine={true} onClick={savePlace}>
        여기로 약속잡기
      </Btn>
    </Section>
  );
};

export default PlaceInfo;

const Section = styled.section`
  padding: calc(${(props) => props.theme.size.xs} * 2);
  background: white;
  height: 100%;
  border-radius: ${(props) => props.theme.size.m} ${(props) => props.theme.size.m} 0 0;
  box-shadow: 0 -0.4rem 1rem rgba(17, 24, 39, 0.15);
  & > * {
    margin-bottom: calc(${(props) => props.theme.size.xs} * 2);
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
`;

const Title = styled(TextBox)`
  cursor: ${(props) => props.cursor};

  min-height: 4.8rem;

  display: flex;
  justify-content: space-between;
  .title {
    font-size: ${(props) => props.theme.size.xl};
  }
  .icon {
    fill: ${(props) => props.theme.color.disable};
  }
`;

const Info = styled.div`
  font-size: ${(props) => props.theme.size.s};
  * {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  div:not(:last-child) {
    margin-bottom: ${(props) => props.theme.size.xs};
  }
  .icon {
    fill: ${(props) => props.theme.color.disable};
    margin-right: calc(${(props) => props.theme.size.l} / 2);
  }
`;

const ImgArea = styled.div`
  cursor: pointer;
  display: flex;
  img {
    width: 100%;
    height: 30rem;
    border-radius: ${(props) => props.theme.size.xs};
    -webkit-user-drag: none;
  }
  img:not(:first-child) {
    margin-left: ${(props) => props.theme.size.s};
  }
`;
