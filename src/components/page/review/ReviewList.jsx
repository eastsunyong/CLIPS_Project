import React from "react";
import styled from "styled-components";

import { FiMapPin } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

const ReviewList = () => {
  return (
    <Section>
      <ToggleArea>
        <Toggle selected={true}>후기쓰기</Toggle>
        <Toggle>작성한 후기</Toggle>
      </ToggleArea>
      <List>
        <Card>
          <Title>
            <span>철수랑 명훈이랑 장희랑</span>
          </Title>
          <SubTitle>회원님외 2명</SubTitle>
          <Info>
            <div>2022. 09. 12 18:00</div>
            <div>
              <FiMapPin />
              <span>탭퍼블릭 여의도점</span>
            </div>
          </Info>
          <Btn>후기쓰기</Btn>
        </Card>
      </List>
    </Section>
  );
};

export default ReviewList;

const Section = styled.div``;

const ToggleArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: calc(${(props) => props.theme.size.m} * 2);
  padding: 0 calc(${(props) => props.theme.size.xs} * 2);

  border-bottom: 0.1rem solid rgba(75, 85, 99, 0.2);

  font-size: ${(props) => props.theme.size.s};
`;

const Toggle = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: inherit;

  border-bottom: 0.3rem solid ${(props) => (props.selected ? props.theme.color.brand : props.theme.color.hidden)};

  color: ${(props) => (props.selected ? props.theme.color.brand : "inherit")};
  font-weight: bold;
`;

const List = styled.div`
  padding: ${(props) => props.theme.size.m};
`;

const Card = styled.div`
  padding: ${(props) => props.theme.size.m};
  border-radius: ${(props) => props.theme.size.xs};
  box-shadow: 0px 0.2rem 0.8rem rgba(75, 85, 99, 0.25);
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.size.m};
  font-weight: bold;
`;

const SubTitle = styled.div`
  color: ${(props) => props.theme.color.disable};
  font-size: ${(props) => props.theme.size.xs};
`;

const Info = styled.div`
  display: flex;

  margin-top: ${(props) => props.theme.size.m};

  font-size: ${(props) => props.theme.size.xs};
  color: ${(props) => props.theme.disableColor};
  & > *:not(:first-child) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: ${(props) => props.theme.size.m};
  }
`;

const Btn = styled.button`
  width: 100%;
  margin-top: ${(props) => props.theme.size.m};
  padding: calc(${(props) => props.theme.size.m} / 2);

  background: ${(props) => (props.outline ? "white" : props.theme.color.brand)};
  border: 0.1rem solid ${(props) => props.theme.color.brand};
  border-radius: calc(${(props) => props.theme.size.m} / 2);

  color: ${(props) => (props.outline ? props.theme.color.brand : "white")};
  font-size: ${(props) => props.theme.size.s};
`;
