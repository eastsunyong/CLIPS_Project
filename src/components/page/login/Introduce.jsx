import React from "react";
import styled from "styled-components";

import { Btn } from "components/common";

const Indroduce = (props) => {
  return (
    <Container>
      <p>로그인하고</p>
      <p>더 많은 기능을 만나보세요!</p>
      <Btn onClick={() => props.setToggle(true)}>로그인 / 회원가입</Btn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.size.m};

  font-size: calc(${(props) => props.theme.size.xs} * 2);
  font-weight: bold;

  & > p:first-child {
    margin-bottom: ${(props) => props.theme.size.l};
  }

  & > button {
    margin: calc(${(props) => props.theme.size.xs} * 2) 0;
  }
`;

export default Indroduce;
