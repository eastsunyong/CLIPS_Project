import React from "react";
import styled from "styled-components";
import { useState } from "react";

import { Btn, Modal, OpacityModal, PageTop } from "components/common";
import { LoginPage, SignUpPage, Line } from ".";
import { sweetalert } from "utils";
//아이콘
import { CloseIcon, KakaoIcon } from "assets/icons";

const Choice = (props) => {
  //맞는거 불러오기
  const [gologin, setGologin] = useState();

  //모달창 불러오기
  const [toggle, setToggle] = useState(false);

  return (
    <OpacityModal toggle={props.toggle}>
      <PageTop>
        <div>
          <div className="icon" onClick={() => props.setToggle(!props.toggle)}>
            <CloseIcon />
          </div>
          <div className="title">로그인</div>
        </div>
      </PageTop>
      <Container className="fcc">
        <Main>
          <h3>우리의 ‘합리적’ 약속 생활,</h3>
          <h1>CLIPs</h1>
        </Main>
        <ButtonBox>
          <OneButton
            onClick={() => {
              sweetalert.avatarAlert();
            }}
          >
            <KakaoIcon />
            <span>카카오로 빠르게 시작하기</span>
          </OneButton>
          <Line />
          <Box>
            <p
              onClick={() => {
                setGologin(false);
                setToggle(true);
              }}
            >
              회원가입
            </p>
            <p>|</p>
            <p
              onClick={() => {
                setGologin(true);
                setToggle(true);
              }}
            >
              CLIPs ID로 로그인
            </p>
          </Box>
        </ButtonBox>
      </Container>
      <CustomModal toggle={toggle}>
        {gologin === true ? <LoginPage toggle={toggle} setToggle={setToggle} /> : <SignUpPage setToggle={setToggle} />}
      </CustomModal>
    </OpacityModal>
  );
};

const Container = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;

  padding: ${(props) => props.theme.size.m};
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  h3 {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    margin-top: 120px;
  }

  h1 {
    color: ${(props) => props.theme.color.brand};
    font-weight: 800;
    font-size: 48px;
    line-height: 60px;
    margin-bottom: 120px;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  cursor: pointer;
  color: #4b5563;
  font-weight: 400;
  margin-top: 24px;
  font-size: 12px;
  font-weight: 400;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const OneButton = styled(Btn)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 24px;
  margin-bottom: 32px;

  border-color: #fee500;
  background-color: #fee500;
  color: black;

  & > :first-child {
    margin-right: ${(props) => props.theme.size.xl};
  }
`;

const CustomModal = styled(Modal)``;

export default Choice;
