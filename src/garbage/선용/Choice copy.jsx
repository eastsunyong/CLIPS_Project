import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { addNumber } from "store/modules/loginSlice";
import { Modal } from "components/common";
import { LoginPage, SignUpPage, Line } from "components/page/login";
//아이콘
import { AiOutlineClose, AiTwotoneMessage } from "react-icons/ai";

const Choice = () => {
  const dispatch = useDispatch();

  //맞는거 불러오기
  const [gologin, setGologin] = useState();

  //모달창 불러오기
  const [toggle, setToggle] = useState(false);

  //컴포넌트 뒤로 이동
  const down = () => {
    console.log("first");
    dispatch(addNumber(false));
  };

  return (
    <All>
      <Container className="fcc">
        <Header>
          <p>
            <AiOutlineClose onClick={down} />
          </p>
          <h2>로그인</h2>
        </Header>
        <Main>
          <h3>우리의 ‘합리적’ 약속 생활,</h3>
          <h1>CLIPs</h1>
        </Main>
        <ButtonBox>
          <OneButton>
            <h1>
              <AiTwotoneMessage />
            </h1>
            <p>카카오로 빠르게 시작하기</p>
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
      <Modal toggle={toggle}>{gologin === true ? <LoginPage setToggle={setToggle} /> : <SignUpPage setToggle={setToggle} />}</Modal>
    </All>
  );
};

const All = styled.div`
  position: relative;
  flex-flow: column;
  min-width: 100%;
  min-height: 100%;
  padding: 0 2rem 2rem 2rem;
  flex-direction: column;
`;

const Container = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 10px;

  input {
    height: 40px;
    width: 343px;
    padding: 10px 16px 10px 16px;
    border: 1px solid #4b556380;
    border-radius: 8px;
    margin-top: 8px;
  }

  label {
    font-size: 14px;
    font-weight: 700;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5rem;
  font-weight: 700;
  align-items: center;
  margin-bottom: 20px;

  p {
    font-size: 20px;
    cursor: pointer;
    margin-right: 20px;
    font-weight: 500;
  }

  h2 {
    font-size: 20px;
  }
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
    color: #0099ff;
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
  padding: 12px 16px;

  button {
    height: 47px;
    width: 343px;
    border-radius: 12px;
    font-weight: 600;
  }
`;

const OneButton = styled.button`
  background-color: #fee500;
  color: black;
  margin-top: 24px;
  margin-bottom: 32px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;

  p {
    margin-left: 50px;
    margin-right: 50px;
    font-weight: 700;
    font-size: 15px;
    line-height: 150%;
  }

  h1 {
    font-size: 22px;
    margin-top: 5px;
  }
`;

export default Choice;
