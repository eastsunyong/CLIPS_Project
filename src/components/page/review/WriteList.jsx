import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Btn, Card, TextBox } from "components/common";
import { LocationIcon, MenuIcon } from "assets/icons";
import { localAPI, promiseAPI } from "apis";

const WriteList = (props) => {
  const [list, setList] = useState([]);

  const getPromise = async () => {
    const answer = await promiseAPI.getList();

    for (let p of answer.list) {
      const res = await localAPI.addressTransfer(p.y, p.x);
      if (!res.docs.length) continue;
      const docInfo = res.docs[0]?.address ? res.docs[0]?.address : res.docs[0]?.road_address;
      p.place = docInfo.address_name;
    }

    setList(answer.list);
  };

  useEffect(() => {
    getPromise();
  }, []);

  return (
    <Article>
      {list.map((promise) => {
        return (
          <CustomCard key={promise.promiseId}>
            <TextBox>
              <div>
                <div className="title">{promise.title}</div>
                <div>{promise.countFriend !== 0 ? `회원님 외 ${promise.countFriend}명` : "자신과의 약속"}</div>
                <div className="info">
                  <span>{promise.date}</span>
                  <span>
                    <span className="pin">
                      <LocationIcon />
                    </span>
                    {promise.place ? promise.place : "장소를 불러올 수 없습니다."}
                  </span>
                </div>
              </div>
              <InnerBtn
                onClick={() => {
                  props.setWriteToggle({ promise, toggle: true });
                }}
              >
                후기쓰기
              </InnerBtn>
            </TextBox>

            <div className="icon">
              <MenuIcon />
            </div>
          </CustomCard>
        );
      })}
    </Article>
  );
};

export default WriteList;

const Article = styled.article`
  flex: 1;
  overflow: scroll;

  padding: ${(props) => props.theme.size.m};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CustomCard = styled(Card)`
  cursor: pointer;
  display: flex;

  margin-bottom: ${(props) => props.theme.size.m};

  .info {
    display: flex;
    align-items: center;
    margin: ${(props) => props.theme.size.m} 0;
    & > :last-child {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: ${(props) => props.theme.size.m};
      .pin {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: calc(${(props) => props.theme.size.xs} / 2);
        fill: ${(props) => props.theme.color.disable};
      }
    }
  }
  .icon {
    cursor: pointer;
    width: ${(props) => props.theme.size.xl};
    height: ${(props) => props.theme.size.xl};
    display: flex;
    justify-content: center;
  }
`;

const InnerBtn = styled(Btn)`
  padding: calc(${(props) => props.theme.size.m} / 2);
`;
