import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { Btn, InputDiv, Modal, PageTop } from "components/common";
import { LeftArrowIcon } from "assets/icons";
import { loginAPI } from "apis";
import { sweetalert } from "utils";
import { SignUpPage3 } from ".";

const SignUpPage = (props) => {
  const {
    getValues,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [emailCheck, setEmailCheck] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [stepOne, setStepOne] = useState(null);

  // 유효성 체크 함수
  const regPass = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const onCheck = (e, type) => {
    e.preventDefault();
    const data = getValues(type);
    if (data === "" || (type === "email" ? regPass.test(data) === false : data.length > 8)) {
      setError(type, { message: "다시 확인해주세요" }, { shouldFocus: true });
    } else {
      let sendData = {};
      sendData[type] = data;
      dupCheckHandler(sendData);
    }
  };

  // 중복 체크 핸들러
  const dupCheckHandler = async (data) => {
    const answer = await loginAPI.dupCheck(data);
    if (answer.result) {
      sweetalert.successAlert(answer.msg);
      setEmailCheck(true);
    } else {
      sweetalert.failAlert(answer.msg);
      setEmailCheck(false);
    }
  };

  //회원가입 함수
  const onSubmit = async (data) => {
    setStepOne(data);
    setToggle(!toggle);
  };

  return (
    <Container>
      <PageTop>
        <div>
          <div
            className="icon"
            onClick={() => {
              props.setToggle(false);
            }}
          >
            <LeftArrowIcon />
          </div>
          <div className="title">회원가입</div>
        </div>
      </PageTop>
      <Article>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inner">
            <p>아이디</p>
            <div className="withBtn">
              <InputDiv className={errors.email && "errorInput"}>
                <input
                  {...register("email", {
                    required: "이메일은 필수 입력입니다",
                    maxLength: { value: 30, message: "30자 이하로 정해주세요" },
                    onChange: () => {
                      setEmailCheck(false);
                    },
                    validate: () => emailCheck === true,
                    pattern: {
                      value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                      message: "이메일이 형식에 맞지 않습니다.",
                    },
                  })}
                  placeholder="이메일을 입력해주세요"
                />
              </InputDiv>
              <Btn outLine={true} onClick={(e) => onCheck(e, "email")} disabled={emailCheck}>
                중복확인
              </Btn>
            </div>
            {errors?.email?.message && <h3>{errors.email.message}</h3>}
          </div>

          <div className="inner">
            <p>비밀번호</p>
            <InputDiv className={errors.password && "errorInput"}>
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
            {errors?.password?.message && <h3>{errors.password.message}</h3>}
          </div>

          <div className="inner">
            <p>비밀번호 확인</p>
            <InputDiv className={errors.confirm && "errorInput"}>
              <input
                {...register("confirm", {
                  required: "비밀번호는 확인은 필수입니다",
                  minLength: { value: 8, message: "8자리 이상 비밀번호를 사용하세요." },
                  maxLength: { value: 16, message: "16자리 이하 비밀번호를 사용하세요." },
                  pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, message: "특수문자와 숫자를 포함해주세요" },
                })}
                placeholder="비밀번호를 한 번 더 입력해주세요"
                type="password"
              />
            </InputDiv>
            {errors?.confirm?.message && <h3>{errors.confirm.message}</h3>}
          </div>

          <div className="inner">
            <p>이름</p>
            <InputDiv className={errors.name && "errorInput"}>
              <input {...register("name", { required: "이름은 필수 입력입니다" })} placeholder="이름을 입력해주세요" maxLength="9" />
            </InputDiv>
            {errors?.name?.message && <h3>{errors.name.message}</h3>}
          </div>

          <div className="inner">
            <p>휴대폰 번호</p>
            <InputDiv className={errors.phone && "errorInput"}>
              <input
                {...register("phone", {
                  required: "전화번호는 필수 입력입니다",
                  minLength: { value: 10, message: "휴대번호는 최소 10자리입니다" },
                  maxLength: { value: 11, message: "휴대번호는 최대 11자리입니다" },
                  pattern: { value: /^01[0-1, 7][0-9]{7,8}$/, message: "휴대전화가 아닙니다" },
                })}
                placeholder="01012345678"
              />
            </InputDiv>
            {errors?.phone?.message && <h3>{errors.phone.message}</h3>}
          </div>
          <BottomBtn>다음</BottomBtn>
        </form>
      </Article>
      <Modal toggle={toggle}>
        <SignUpPage3 stepOne={stepOne} setStepOne={setStepOne} setToggle={setToggle} />
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  height: 100%;

  .withBtn {
    display: flex;
    button {
      width: 30%;
      margin-left: 0.4rem;
    }
  }
  .inner p {
    font-size: ${(props) => props.theme.size.s};
    font-weight: bold;
    margin-bottom: calc(${(props) => props.theme.size.m} / 2);
  }

  div > h3 {
    font-family: "SUIT";
    font-style: normal;
    font-weight: 400;
    font-size: ${(props) => props.theme.size.xs};
    line-height: 130%;
    color: #df0c0c;
    margin-top: calc(${(props) => props.theme.size.xs} / 3);
  }

  .errorInput {
    border: 1px solid #df0c0c;
  }
`;

const Article = styled.article`
  position: relative;
  flex: 1;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  form {
    padding: ${(props) => props.theme.size.m};
  }
  & > form > *:not(:last-child) {
    margin-bottom: calc(${(props) => props.theme.size.xs} * 2);
  }
`;

const BottomBtn = styled(Btn)`
  position: absolute;
  bottom: 0;
  width: calc(100% - (${(props) => props.theme.size.m} * 2));
  margin-bottom: ${(props) => props.theme.size.m};
`;

export default SignUpPage;
