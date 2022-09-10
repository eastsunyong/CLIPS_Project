import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { addNumber, minusNumber } from "store/modules/loginSlice";

//아이콘
import { AiOutlineClose } from 'react-icons/ai';

const LoginPage = () => {

  const dispatch = useDispatch();

  //컴포넌트 앞으로 이동
const up = (e)=> {
        dispatch(addNumber(1))
    }

   //컴포넌트 뒤로 이동
  const down= (e)=> {
    dispatch(minusNumber(1))
}

  //로그인 함수
  const onSubmit = (data) => {
    LogInHandler(data)
  };


  //로그핸들러
  const LogInHandler = async (data) => {
    await axios.post(process.env.REACT_APP_SURVER + '/api/auth/signup', data)
  }

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
        <p><AiOutlineClose onClick={down}/></p>
        <h2>로그인</h2>
      </Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{marginBottom:"8px"}}>
            <div style={{ flexDirection: "row", display: "flex", gap: "2rem" }}>
              {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            </div>
            <input
              {...register("email", {
                required: "이메일은 필수 입력입니다", maxLength: { value: 30, message: "30자 이하로 정해주세요" },
                pattern: {
                  value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/, message: "이메일이 형식에 맞지 않습니다.",
                }
              })}
              placeholder="이메일을 입력해주세요"
            />
          </div>
          <div>
            <div style={{ flexDirection: "row", display: "flex", gap: "2rem" }}>
              {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
            </div>
            <input
              {...register("password", {
                required: "비밀번호는 필수 입력입니다", minLength: { value: 8, message: "8자리 이상 비밀번호를 사용하세요.", },
                maxLength: { value: 16, message: "16자리 이하 비밀번호를 사용하세요.", }, pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, message: "특수문자와 숫자를 포함해주세요" }
              })}
              placeholder="비밀번호를 입력해주세요"
              type="password"
            />
          </div>
          <ButtonBox>
            <OneButton>로그인</OneButton>
            <Box>
            <p>아이디 찾기</p><p>|</p><p>비밀번호 찾기</p>
            </Box>
              <TwoButton type="button" onClick={up}>회원가입</TwoButton>
          </ButtonBox>
        </form>
      </Container>
    </All>
  )
};

const All = styled.div`
  position: relative;
  flex-flow: column;
  min-width: 100%;
  min-height: 100%;
  padding: 0 2rem 2rem 2rem;
  flex-direction: column;
`

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
        margin-top: 5px;
    }

    h2 {
        font-size: 20px;
        margin-top: 0px;
    }
`


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
    border: 1px solid #4B556380;
    border-radius: 8px;
  }

`

const Box = styled.div`
 display: flex;
 flex-direction: row;
 gap: 8px;
 cursor: pointer;
`
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    height: 40px;
    width: 343px;
    border-radius: 8px;
    font-weight: 600;
  }
`

const OneButton = styled.button`
  background-color: ${(props) => props.theme.themeColor};
  color: white;
  margin-top: 24px;
  margin-bottom: 16px;
  border: none;
`

const TwoButton = styled.button`
  margin-top: 32px;
  background-color: white;
  border: 1px solid ${(props) => props.theme.themeColor};
  color: ${(props) => props.theme.themeColor};
`

export default LoginPage;
