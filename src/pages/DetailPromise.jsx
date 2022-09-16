import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { MapMarker, StaticMap } from "react-kakao-maps-sdk";

import { PageTop, TextBox } from "components/common";
import { LeftArrowIcon, LocationIcon } from "assets/icons";
import { promiseAPI } from "apis";

const DetailPromise = () => {
  const { promiseId } = useParams();
  const nav = useNavigate();

  const [item, setItem] = useState();

  const getItem = async (promiseId) => {
    const answer = await promiseAPI.getPromise(promiseId);
    if (answer) {
      setItem(answer.promise);
    }
  };

  useEffect(() => {
    getItem(promiseId);
  }, []);

  console.log(item);

  return (
    <>
      <CustomPageTop>
        <div>
          <div
            className="icon"
            onClick={() => {
              nav("/promised");
            }}
          >
            <LeftArrowIcon />
          </div>
          <div className="title">약속 상세</div>
        </div>
        <div className="title">편집</div>
      </CustomPageTop>
      <Section>
        <div className="name">{item?.title}</div>

        <CustomTb>
          <div className="title">약속날짜</div>
          <div>{item?.date}</div>
        </CustomTb>

        <CustomTb>
          <div className="title">멤버</div>
          {item?.countFriend > 0 ? (
            item?.friendList.map((friend) => {
              return <FriendDiv>{friend.name}</FriendDiv>;
            })
          ) : (
            <div>참여 멤버가 없습니다.</div>
          )}
        </CustomTb>

        <CustomTb>
          <div className="title">약속장소</div>
          <div className="icon">
            <span>
              <LocationIcon />
            </span>
            <span>
              {item?.x} + {item?.y}
            </span>
          </div>
        </CustomTb>
        <StaticMap
          center={{
            lat: 33.450701,
            lng: 126.570667,
          }}
          style={{
            width: "100%",
            height: "16rem",
          }}
          marker={{
            lat: 33.450701,
            lng: 126.570667,
          }}
          level={3}
        ></StaticMap>
      </Section>
    </>
  );
};

export default DetailPromise;

const Section = styled.section`
  padding: ${(props) => props.theme.size.m};
  & > * {
    margin-bottom: calc(${(props) => props.theme.size.xs} * 2);
  }
  .name {
    font-size: ${(props) => props.theme.size.xl};
    font-weight: bold;
  }
`;

const CustomPageTop = styled(PageTop)`
  & > :last-child {
    cursor: pointer;
    color: ${(props) => props.theme.color.brand};
    font-size: ${(props) => props.theme.size.s};
  }
`;

const CustomTb = styled(TextBox)`
  font-size: ${(props) => props.theme.size.m};

  .title {
    font-size: ${(props) => props.theme.size.s};
  }
  .icon {
    fill: ${(props) => props.theme.color.disable};
    & > :first-child {
      margin-right: calc(${(props) => props.theme.size.m} / 2);
    }
  }
`;

const FriendDiv = styled.span`
  padding: calc(${(props) => props.theme.size.xs} / 3) calc(${(props) => props.theme.size.m} / 2);

  border: 0.1rem solid ${(props) => props.theme.color.disable};
  border-radius: calc(${(props) => props.theme.size.xl} * 3);
  font-size: ${(props) => props.theme.size.xs};
`;
