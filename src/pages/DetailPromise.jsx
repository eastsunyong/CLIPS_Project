import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { StaticMap } from "react-kakao-maps-sdk";

import { ModifyPromise } from "components/page/promise";
import { PageTop, TextBox } from "components/common";
import { LeftArrowIcon, LocationIcon } from "assets/icons";
import { promiseAPI } from "apis";
import { jwt, sweetalert } from "utils";

const DetailPromise = () => {
  const { promiseId } = useParams();
  const nav = useNavigate();

  const [item, setItem] = useState(null);
  const [toggle, setToggle] = useState(false);

  const getItem = async (promiseId) => {
    const answer = await promiseAPI.getPromise(promiseId);
    if (answer.result) {
      setItem(answer.promise);
    } else {
      sweetalert.areaWithout();
      nav("/promised");
    }
  };

  useEffect(() => {
    getItem(promiseId);
  }, []);

  return (
    <>
      <Section>
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
          {/* {item?.userId === jwt.getUserId() && (
            <div
              className="title modify"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              편집
            </div>
          )} */}
        </CustomPageTop>
        <Article>
          <div className="name">{item?.title}</div>

          <CustomTb>
            <div className="title">약속날짜</div>
            <div>{item?.date}</div>
          </CustomTb>

          <CustomTb>
            <div className="title">멤버</div>
            <FriendDiv>{item?.username}</FriendDiv>
            {item?.countFriend > 0
              ? item?.friendList.map((friend, i) => {
                  return <FriendDiv key={friend.name + i}>{friend.name}</FriendDiv>;
                })
              : null}
          </CustomTb>

          <CustomTb>
            <div className="title">약속장소</div>
            <div className="icon">
              <span>
                <LocationIcon />
              </span>
              <span>{item?.location ? item.location : "장소를 찾을 수 없습니다."}</span>
            </div>
          </CustomTb>
          {item?.location && (
            <StaticMap
              center={{
                lat: item.x,
                lng: item.y,
              }}
              style={{
                width: "100%",
                height: "24rem",
              }}
              marker={{
                lat: item.x,
                lng: item.y,
              }}
              level={3}
            />
          )}
        </Article>
      </Section>
      <ModifyPromise item={item} toggle={toggle} setToggle={setToggle} />
    </>
  );
};

export default DetailPromise;

const Section = styled.section`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
`;

const Article = styled.article`
  flex: 1;
  overflow: scroll;
  padding: ${(props) => props.theme.size.m};

  & > * {
    margin-bottom: calc(${(props) => props.theme.size.xs} * 2);
  }
  &::-webkit-scrollbar {
    display: none;
  }
  .name {
    font-size: ${(props) => props.theme.size.xl};
    font-weight: bold;
  }
`;

const CustomPageTop = styled(PageTop)`
  .modify {
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
  margin-right: calc(${(props) => props.theme.size.xs} / 3);
  padding: calc(${(props) => props.theme.size.xs} / 3) calc(${(props) => props.theme.size.m} / 2);

  border: 0.1rem solid ${(props) => props.theme.color.disable};
  border-radius: calc(${(props) => props.theme.size.xl} * 3);
  font-size: ${(props) => props.theme.size.xs};
`;
