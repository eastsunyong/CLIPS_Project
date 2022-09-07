import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { useState } from "react";
// import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  // const LogInHandler = async (data) => {
  //   await axios.post(process.env.REACT_APP_SURVER + '/api/auth/signup', data)
  // }

  const {
    getValues,
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    // LogInHandler(data)
    const Qwe = getValues("nickname");
    console.log(data);
    console.log(Qwe);
  };

  // const onValid = (data) => console.log(data, "onvalid");
  // const onInvalid = (data) => console.log(data, "onInvalid");

  // {...register("email", {required: "이메일은 필수 입력입니다.",
  // minLength: {value: 8,message: "이메일을 8자 이상 작성해주세요",},maxLength: {value: 30,message: "이메일을 30자 이하로 작성해주세요", },
  //   pattern: {
  //   value:
  //   /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
  //   message: "이메일이 형식에 맞지 않습니다.",
  //   },
  //   })}

  // { pattern:/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/}

  return (
    <Container className="fcc">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>nickname</p>
          <input {...register("nickname", { required: "빈칸입니다", minLength: { value: 5, message: "아이디가 짧아여" } })} placeholder="닉네임" />
          {errors.nickname && <p style={{ color: "red" }}>{errors.nickname.message}</p>}

          <p>비밀번호</p>
          <input
            {...register("password", {
              required: "비밀번호는 필수 입력입니다.",
              minLength: { value: 8, message: "8자리 이상 비밀번호를 사용하세요." },
            })}
            placeholder="비밀번호"
            type="password"
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>
        <div className="fcc">
          <Container>
            <button>로그인</button>
            <h2
              onClick={() => {
                navigate("/signup");
              }}
            >
              회원가입
            </h2>
          </Container>
        </div>
      </form>
    </Container>
  );
};

const Container = styled.div`
  background: black;
  flex-direction: column;
  p {
    font-size: 2rem;
  }
  input {
    height: 3rem;
    width: 20rem;
    padding: 0.5rem;
  }
`;

export default Login;
