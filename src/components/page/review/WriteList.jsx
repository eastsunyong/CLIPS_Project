import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Btn, Card, TextBox } from "components/common";
import { LocationIcon } from "assets/icons";
import { promiseAPI } from "apis";
import { jwt } from "utils";

const WriteList = (props) => {
  const [list, setList] = useState([]);

  const getPromise = async () => {
    const answer = await promiseAPI.getList();
    setList(answer.list);
  };

  useEffect(() => {
    if (!props.writeToggle.toggle) {
      getPromise();
    }
  }, [props.writeToggle]);

  return (
    <Article>
      {list.map((promise) => {
        if (promise.userId === jwt.getUserId()) {
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
                      {promise.location ? promise.location : "장소를 불러올 수 없습니다."}
                    </span>
                  </div>
                </div>
                {promise.done ? (
                  <InnerBtn outLine={true}>후기 작성 완료</InnerBtn>
                ) : (
                  <InnerBtn
                    onClick={() => {
                      props.setWriteToggle({ promise, toggle: true });
                    }}
                  >
                    후기쓰기
                  </InnerBtn>
                )}
              </TextBox>
            </CustomCard>
          );
        }
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
