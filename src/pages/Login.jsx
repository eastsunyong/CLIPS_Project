import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  
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
    <Container className="fcc">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
        </div>
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

        <div className="fcc">
          <Container>
            <button>로그인</button>
            <h2 onClick={() => { navigate('/signup') }}>회원가입</h2>
          </Container>
        </div>
      </form>
    </Container>
  )
};


const Container = styled.div`

flex-direction: column;
  p{
    font-size: 12px;
  }
  input {
    height: 3rem;
    width: 20rem;
    padding: 0.5rem;
  }
`

export default Login;
