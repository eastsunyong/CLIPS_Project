import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

const LoginPage = (props) => {

  const navigate = useNavigate();

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
      {/* <Header>
        <p>✔</p>
        <h1>로그인</h1>
      </Header> */}

      <Container className="fcc">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <div style={{ flexDirection: "row", display: "flex", gap: "2rem" }}>
              <label>이메일</label>
              {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            </div>
            <input
              {...register("email", {
                required: "이메일은 필수 입력입니다", maxLength: { value: 30, message: "30자 이하로 정해주세요" },
                pattern: {
                  value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/, message: "이메일이 형식에 맞지 않습니다.",
                }
              })}
              placeholder="이메일"
            />
          </Box>
          <Box>
            <div style={{ flexDirection: "row", display: "flex", gap: "2rem" }}>
              <label>비밀번호</label>
              {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
            </div>
            <input
              {...register("password", {
                required: "비밀번호는 필수 입력입니다", minLength: { value: 8, message: "8자리 이상 비밀번호를 사용하세요.", },
                maxLength: { value: 16, message: "16자리 이하 비밀번호를 사용하세요.", }, pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, message: "특수문자와 숫자를 포함해주세요" }
              })}
              placeholder="비밀번호 (특수문자, 숫자 포함)"
              type="password"
            />
          </Box>

          <div>
            <BtnBox>
              <button>로그인</button>
              <button type="button" onClick={()=> {
              props.setPage(0)
              }} >뒤로 가기</button>
            </BtnBox> 
            <TextBox>
              <button type="button" onClick={() => {
                props.setPage(2)
              }}>회원가입</button>
            </TextBox>
          </div>
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
  width: 100%;
  height: 4rem;
  border-bottom: 3px solid gray;
  align-items: center;
  display: flex;

  font-weight: 600;
  gap: 5rem;
  padding-left: 10px;

  p {
    font-size: 2rem;
    cursor: pointer;
  }
`


const Container = styled.div`

  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 20px;

  p{
    font-size: 12px;
  }
  input {
    height: 41px;
    width: 30rem;
    padding: 0.5rem;
    border: 1px solid #0099FF;
    border-radius: 8px;
  }

  label {
    font-size: 1.5rem;
  }

  h2 {
    margin-top: 20px;
    cursor: pointer;
  }

  button {
    background-color: white;
    border: 1px solid #0099FF;
        width: 50%;
        height: 35px;
        border-radius: 8px;
  }
  button:hover {
    background-color: #0099FF;
  }
`

const Box = styled.div`
  margin-top: 2rem;
`

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
`

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  margin-top: 2rem;
`

export default LoginPage;
