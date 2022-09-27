import React from "react";
import styled from "styled-components";

import { Btn, OpacityModal } from "components/common";

const WelcomePage = ({ welcome, signin }) => {
  return (
    <OpacityModal toggle={welcome.toggle}>
      <Section>
        <Info>
          <p className="logo">CLIPs</p>
          <p>우리의 ‘합리적’ 약속 생활,</p>
          <p>CLIPs에 오신 것을 환영합니다.</p>
        </Info>
        <Btn onClick={() => signin(welcome.data)}>클립스 시작하기</Btn>
      </Section>
    </OpacityModal>
  );
};

export default WelcomePage;

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  flex-flow: column;

  height: 100%;
  width: 100%;

  padding: 1.6rem;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  height: 50%;

  font-size: 2rem;
  font-weight: bold;
  p {
    margin-bottom: 1rem;
  }

  .logo {
    margin-bottom: 2rem;

    font-size: 4.8rem;
    color: ${(props) => props.theme.color.brand};
  }
`;
