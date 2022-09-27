import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";

const FindPassword = (props) => {
  const {
    getValues,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  //오류 메세지 확인
  const onValid = (data) => console.log(data, "onvalid");
  const onInvalid = (data) => console.log(data, "onInvalid");

  return (
    <All>
      <Container className="fcc">
        <Header>
          {/* <p>
            <AiOutlineLeft
              onClick={() => {
                props.setToggle(false);
              }}
            />
          </p> */}
          <h2>비밀번호 찾기</h2>
        </Header>
        <form>
          <label>이메일</label>
          <Center>
            <input placeholder="example@email.com" />
            <button>인증받기</button>
          </Center>
          <label>인증번호</label>
          <div>
            <input placeholder="인증번호 4자리" />
          </div>
          <label>휴대폰번호</label>
          <div>
            <input placeholder="휴대폰 번호를 입력해주세요." />
          </div>
          <GoFind>재설정하기</GoFind>
        </form>
      </Container>
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
    margin-right: 24px;
    font-weight: 500;
    margin-top: 4px;
  }

  h2 {
    font-size: 20px;
    margin-top: 0px;
    line-height: 24.96px;
    font-weight: 700;
  }
`;

const Container = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 10px;

  label {
    font-size: 14px;
    font-weight: 700;
  }

  input {
    height: 40px;
    width: 343px;
    padding: 10px 16px 10px 16px;
    border: 1px solid #4b556380;
    border-radius: 8px;
    margin-top: 8px;
    margin-bottom: 16px;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  justify-content: center;

  input {
    height: 40px;
    width: 259px;
    padding: 10px 16px 10px 16px;
    border: 1px solid #4b556380;
    border-radius: 8px;
  }

  button {
    width: 80px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.themeColor};
    color: ${(props) => props.theme.themeColor};
    font-weight: 600;
    font-size: 14px;
    background-color: white;
    margin-bottom: 8px;
  }
`;
const GoFind = styled.button`
  width: 343px;
  height: 41px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.theme.themeColor};
  color: white;
`;

export default FindPassword;
