import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Btn, InputDiv, PageTop } from "components/common";
// import { FindId, FindPassword } from "components/page/login";

//아이콘
import axios from "axios";
import { CloseIcon } from "assets/icons";
// import { axios } from "utils";

const LoginPage = (props) => {
  //모달창 상태값
  // const [toggle, setToggle] = useState(false);

  //갈림길 상태값
  // const [gofind, setGofind] = useState();

  //로그인 함수
  const onSubmit = (data) => {
    LogInHandler(data);
  };

  //로그핸들러
  const LogInHandler = async (data) => {
    try {
      const res = await axios.post(process.env.REACT_APP_SERVER + `/auth/signin`, data);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      const msg = res.data.message;
      console.log(res);
      alert(msg);

      // 새로고침 발생시키기
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("시랲패");
    }
  };

  const { register, handleSubmit } = useForm({ mode: "onChange" });

  return (
    <>
      <PageTop>
        <div>
          <div
            className="icon"
            onClick={() => {
              props.setToggle(false);
            }}
          >
            <CloseIcon />
          </div>
          <div className="title">CLIPs ID로 로그인</div>
        </div>
      </PageTop>

      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inner">
            <p>아이디</p>
            <InputDiv>
              <input
                {...register("email", {
                  required: "이메일은 필수 입력입니다",
                  maxLength: { value: 30, message: "30자 이하로 정해주세요" },
                  pattern: {
                    value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                    message: "이메일이 형식에 맞지 않습니다.",
                  },
                })}
                placeholder="이메일을 입력해주세요"
              />
            </InputDiv>
          </div>

          <div className="inner">
            <p>비밀번호</p>
            <InputDiv>
              <input
                {...register("password", {
                  required: "비밀번호는 필수 입력입니다",
                  minLength: { value: 8, message: "8자리 이상 비밀번호를 사용하세요." },
                  maxLength: { value: 16, message: "16자리 이하 비밀번호를 사용하세요." },
                  pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, message: "특수문자와 숫자를 포함해주세요" },
                })}
                placeholder="비밀번호를 입력해주세요"
                type="password"
              />
            </InputDiv>
          </div>

          <Btn>로그인</Btn>
        </form>

        <Box>
          <p
            onClick={() => {
              alert("구현중인 기능입니다");
              // setGofind(true);
              // setToggle(true);
            }}
          >
            아이디 찾기
          </p>
          <p>|</p>
          <p
            onClick={() => {
              alert("구현중인 기능입니다");
              // setGofind(false);
              // setToggle(true);
            }}
          >
            비밀번호 찾기
          </p>
        </Box>
      </Container>

      {/* <Modal toggle={toggle}>{gofind === true ? <FindId setToggle={setToggle} /> : <FindPassword setToggle={setToggle} />}</Modal> */}
    </>
  );
};

const Container = styled.div`
  padding: ${(props) => props.theme.size.m};
  & > form > * {
    margin-bottom: calc(${(props) => props.theme.size.xs} * 2);
  }
  .inner p {
    font-size: ${(props) => props.theme.size.s};
    font-weight: bold;
    margin-bottom: calc(${(props) => props.theme.size.m} / 2);
  }
`;

const Box = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  color: #4b5563;
  font-size: ${(props) => props.theme.size.xs};
`;
export default LoginPage;
