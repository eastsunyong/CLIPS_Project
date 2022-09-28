import React, { memo } from "react";
import styled from "styled-components";
import { useState } from "react";

import { TypePage } from ".";
import { Btn, OpacityModal, PageField } from "components/common";
import { Close, Kakao } from "assets/icons";

const Intro = ({ toggle, setToggle }) => {
  // 로그인/회원가입창 호출
  const [choice, setChoice] = useState({ toggle: false, type: "회원가입" });

  return (
    <OpacityModal toggle={toggle}>
      <PageField
        icon={
          <div
            className="btn"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <Close className="sm" />
          </div>
        }
        title="로그인"
      >
        <Info>
          <p>우리의 ‘합리적’ 약속 생활,</p>
          <p className="logo">CLIPs</p>
        </Info>

        {/* <a href={`${process.env.REACT_APP_SERVER}/auth/kakao`}> */}
        <KakaoBtn>
          <Kakao className="md" />
          <p>카카오로 빠르게 시작하기</p>
        </KakaoBtn>
        {/* </a> */}

        <Dash>
          <p>또는</p>
          <div className="line" />
        </Dash>

        <ChoiceBtns>
          <p
            onClick={() => {
              setChoice({ toggle: !choice.toggle, type: "회원가입" });
            }}
          >
            회원가입
          </p>
          <div className="line" />
          <p
            onClick={() => {
              setChoice({ toggle: !choice.toggle, type: "CLIPs ID로 로그인" });
            }}
          >
            CLIPs ID로 로그인
          </p>
        </ChoiceBtns>
      </PageField>
      <TypePage choice={choice} setChoice={setChoice} />
    </OpacityModal>
  );
};

export default memo(Intro);

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  height: 50%;

  font-size: 1.6rem;

  .logo {
    margin-top: 1rem;

    font-size: 4.8rem;
    font-weight: bold;
    color: ${(props) => props.theme.color.brand};
  }
`;

const Dash = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 2.4rem;

  font-size: 1.2em;
  color: ${(props) => props.theme.color.black.light};

  .line {
    border: 0.1rem solid ${(props) => props.theme.color.disable};
    position: absolute;
    width: 100%;
    z-index: -1;
  }

  p {
    padding: 0 1.6rem;
    background: white;
  }
`;

const KakaoBtn = styled(Btn)`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding: 1rem 1.6rem;

  border-radius: 1.2rem;
  border-color: #fee500;
  background: #fee500;

  color: black;

  p {
    width: 100%;
  }
`;

const ChoiceBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.2em;

  & > *:not(.line) {
    width: 50%;
    padding: 1.6rem;
  }

  & > :first-child {
    display: flex;
    justify-content: flex-end;
  }

  .line {
    height: 1.2rem;
    border: 0.1rem solid ${(props) => props.theme.color.disable};
  }
`;
