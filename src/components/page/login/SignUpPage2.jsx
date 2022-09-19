import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { Btn, InputDiv, OpacityModal, PageTop } from "components/common";
import { CameraIcon, LeftArrowIcon } from "assets/icons";
import { loginAPI } from "apis";
import defaultImg from "assets/img/UserDefaultImg.png";
import { sweetalert } from "utils";
import { isLogin } from "store/modules/loginSlice";

const SignUpPage = (props) => {
  const { getValues, register, handleSubmit, setError, watch } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const [emailCheck, setEmailCheck] = useState(false);
  const [nickCheck, setNickCheck] = useState(false);
  const [loginToggle, setLoginToggle] = useState({ toggle: false });
  //이미지 미리보기 저장하는  곳
  const [attachment, setAttachment] = useState();

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
      Object.keys(data)[0] === "email" ? setEmailCheck(true) : setNickCheck(true);
    } else {
      sweetalert.failAlert(answer.msg);
      Object.keys(data)[0] === "email" ? setEmailCheck(false) : setNickCheck(false);
    }
  };

  //회원가입 함수
  const onSubmit = async (data) => {
    const answer = await loginAPI.signup(data);
    if (answer.result) {
      sweetalert.successTimerAlert(answer.msg);
      setLoginToggle({ toggle: true, email: data.email, password: data.password });
    }
    // 이미지 업로드 기능 추가시 활성화
    // const formData = new FormData();
    // Object.keys(data).forEach((key) => {
    //   formData.append(key, data[key]);
    // });
  };

  // 자동 로그인
  const autoLogin = async () => {
    const loginData = { email: loginToggle.email, password: loginToggle.password };
    const loginAnswer = await loginAPI.login(loginData);
    if (loginAnswer) dispatch(isLogin(true));
  };

  //사진 미리보기   원리 사진을 미리 사이트에서
  const previewImg = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onloadend = (finishiedEvent) => {
      const {
        currentTarget: { result },
      } = finishiedEvent;
      setAttachment(result);
    };
  };

  // 파일 업로드 감시
  const selectImg = watch("image");
  useEffect(() => {
    if (selectImg?.length) {
      previewImg(selectImg);
    }
  }, [selectImg]);

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
        <UserImage className="fcc">
          <div>
            <img src={attachment ? attachment : defaultImg} alt="업로드할 이미지" />
            {/* <ImgBtn htmlFor="file"> */}
            <ImgBtn onClick={() => sweetalert.avatarAlert()}>
              <CameraIcon></CameraIcon>
            </ImgBtn>
          </div>
        </UserImage>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inner">
            <p>아이디</p>
            <div className="withBtn">
              <InputDiv>
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
          </div>

          <div className="inner">
            <p>닉네임</p>
            <div className="withBtn">
              <InputDiv>
                <input
                  {...register("nickname", {
                    required: "닉네임은 필수 입력입니다",
                    maxLength: { value: 8, message: "8자 이하로 정해주세요" },
                    onChange: () => {
                      setNickCheck(false);
                    },
                    validate: () => nickCheck === true,
                  })}
                  placeholder="닉네임을 입력해주세요"
                  maxLength="9"
                />
              </InputDiv>
              <Btn outLine={true} onClick={(e) => onCheck(e, "nickname")} disabled={nickCheck}>
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
            <p>이름</p>
            <InputDiv>
              <input {...register("name", { required: "이름은 필수 입력입니다" })} placeholder="이름을 입력해주세요" maxLength="9" />
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
          {/* <input id="file" type="file" accept=".png, .jpg" {...register("image")} hidden /> */}

          <Btn>가입 완료</Btn>
        </form>
      </Article>
      <OpacityModal toggle={loginToggle.toggle}>
        <EndPage>
          <Comment>
            <h1>CLIPs</h1>
            <div>
              <h3>우리의 ‘합리적’ 약속 생활,</h3>
              <h3>클립스에 오신 것을 환영합니다.</h3>
            </div>
          </Comment>
          <Btn onClick={autoLogin}>클립스 시작하기</Btn>
        </EndPage>
      </OpacityModal>
    </Container>
  );
};

const Container = styled.div`
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

const UserImage = styled.div`
  margin-bottom: 2rem;
  & > div {
    position: relative;
    width: 10rem;
    height: 10rem;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const ImgBtn = styled.label`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(${(props) => props.theme.size.l} * 2);
  height: calc(${(props) => props.theme.size.l} * 2);
  padding: ${(props) => props.theme.size.xs};

  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const EndPage = styled.article`
  position: relative;
  height: 100%;
  padding: ${(props) => props.theme.size.m};

  & > button {
    position: absolute;
    bottom: 0;
    width: calc(100% - (${(props) => props.theme.size.m} * 2));
    margin-bottom: ${(props) => props.theme.size.m};
  }
`;

const Comment = styled.div`
  height: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > :last-child {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: calc(${(props) => props.theme.size.xs} * 2);
  }

  h3 {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
  }

  h1 {
    color: ${(props) => props.theme.color.brand};
    font-weight: 800;
    font-size: 48px;
    line-height: 60px;
  }
`;

export default SignUpPage;
