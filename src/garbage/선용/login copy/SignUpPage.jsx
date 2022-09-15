import React from "react";
import styled from "styled-components";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

//아이콘
import { Btn, InputDiv, Modal, PageTop } from "components/common";
import { signUpData } from "store/modules/signupSlice";
import { SignUpPage2 } from "components/page/login";
import { LeftArrowIcon } from "assets/icons";

const SignUpPage = (props) => {
  const dispatch = useDispatch();

  const qwea = useSelector((state) => state.SIGNUP.data);

  //모달창 상태값
  const [toggle, setToggle] = useState(false);
  //이메일 잠금
  const [emailNonTouch, setEmailNonTouch] = useState(false);
  //닉네임 잠금
  const [nickNonTouch, setNickNonTouch] = useState(false);
  //이미지 미리보기 저장하는  곳
  const [attachment, setAttachment] = useState();
  //이미지 저장하는 곳
  const fileInput = useRef(null);
  //이메일 정규식 맞는지 확인
  const regPass = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  const { getValues, register, handleSubmit, setError } = useForm({ mode: "onChange" });

  //이메일 체크 함수
  const onEmailCheck = (data) => {
    const email = getValues("email");
    if (email === "" || regPass.test(email) === false) {
      setError("email", { message: "다시 확인해주세요" }, { shouldFocus: true });
    } else {
      emailCheckHandler(email);
    }
  };

  //이메일 체크 핸들러
  const emailCheckHandler = async (email) => {
    try {
      await axios.post(process.env.REACT_APP_SERVER + `/auth/email`, { email }).then((res) => {
        const msg = res.data.message;
        console.log(res);
        alert(msg);
        setEmailNonTouch(true);
      });
    } catch {
      alert("시랲패");
    }
  };

  //닉네임 체크 함수
  const onNickCheck = (data) => {
    const nickname = getValues("nickname");
    if (nickname === "" || nickname.length > 8) {
      setError("nickname", { message: "다시 확인해주세요" }, { shouldFocus: true });
    } else {
      NicknameCheckHandler(nickname);
    }
  };

  //닉네임 체크 핸들러
  const NicknameCheckHandler = async (nickname) => {
    try {
      await axios.post(process.env.REACT_APP_SERVER + `/auth/nickname`, { nickname }).then((res) => {
        const msg = res.data.message;
        console.log(res);
        alert(msg);
        setNickNonTouch(true);
      });
    } catch (err) {
      alert("시랲패");
    }
  };

  //회원가입 함수
  const onSubmit = (data) => {
    dispatch(signUpData(data));
    setToggle(true);
    console.log(qwea);

    // SignUpHandler(data)
  };

  //회원가입 핸들러
  const SignUpHandler = async (data) => {
    console.log(data);
    //비밀번호 확인 조건문
    if (data.password !== data.confirmpassword) {
      setError("confirmpassword", { message: "비밀번호가 일치하지 않습니다" }, { shouldFocus: true });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("name", data.name);
      formData.append("nickname", data.nickname);
      formData.append("password", data.password);
      formData.append("confirm", data.confirmpassword);
      formData.append("phone", data.phone);

      await axios.post(process.env.REACT_APP_SERVER + "/auth/signup", data).then((res) => {
        const msg = res.data.message;
        console.log(res);
        alert(msg);
      });
    } catch (err) {
      alert("시랲패");
      console.log(err);
    }
  };

  //사진 미리보기   원리 사진을 미리 사이트에서
  const selectImg = (e) => {
    const reader = new FileReader();
    const theFile = fileInput.current.files[0];
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishiedEvent) => {
      const {
        currentTarget: { result },
      } = finishiedEvent;
      setAttachment(result);
    };
  };

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
            <LeftArrowIcon />
          </div>
          <div className="title">회원가입</div>
        </div>
      </PageTop>

      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inner">
            <p>아이디</p>
            <div>
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
              <Btn outLine={true} onClick={onEmailCheck}>
                중복확인
              </Btn>
            </div>
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

          <div className="inner">
            <p>비밀번호 확인</p>
            <InputDiv>
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
          </div>

          <div className="inner">
            <p>휴대폰 번호</p>
            <InputDiv>
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
          </div>

          <Btn>다음</Btn>
        </form>
      </Container>
      <Modal toggle={toggle}>
        <SignUpPage2 setToggle={setToggle} />
      </Modal>
    </>
  );
};

const Container = styled.div`
  padding: ${(props) => props.theme.size.m};
  & > form > * {
    margin-bottom: calc(${(props) => props.theme.size.xs} * 2);
  }
  .inner:first-child > div {
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
`;
export default SignUpPage;
