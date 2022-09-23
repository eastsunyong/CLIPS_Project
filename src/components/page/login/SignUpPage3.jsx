import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { Btn, InputDiv, OpacityModal, PageTop } from "components/common";
import { CameraIcon, LeftArrowIcon } from "assets/iconList";
import { loginAPI } from "apis";
import defaultImg from "assets/img/UserDefaultImg.png";
import { sweetalert } from "utils";
import { isLogin } from "store/modules/loginSlice";

const SignUpPage = (props) => {
  const {
    getValues,
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
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
      setNickCheck(true);
    } else {
      sweetalert.failAlert(answer.msg);
      setNickCheck(false);
    }
  };

  //회원가입 함수
  const onSubmit = async (data) => {
    const sendData = { ...data, ...props.stepOne };
    const answer = await loginAPI.signup(sendData);
    if (answer.result) {
      sweetalert.successTimerAlert(answer.msg);
      setLoginToggle({ toggle: true, email: sendData.email, password: sendData.password });
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
              <CameraIcon />
            </ImgBtn>
          </div>
        </UserImage>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inner">
            <p>닉네임</p>
            <div className="withBtn">
              <InputDiv className={errors.nickname && "errorInput"}>
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
            {errors?.nickname?.message && <h3>{errors.nickname.message}</h3>}
          </div>

          {/* <input id="file" type="file" accept=".png, .jpg" {...register("image")} hidden /> */}

          <BottomBtn>가입 완료</BottomBtn>
        </form>
      </Article>
      <OpacityModal toggle={loginToggle.toggle}>
        <EndPage>
          <Comment>
            <h1>CLIPs</h1>
            <div>
              <h3 className="h3">우리의 ‘합리적’ 약속 생활,</h3>
              <h3 className="h3">클립스에 오신 것을 환영합니다.</h3>
            </div>
          </Comment>
          <Btn onClick={autoLogin}>클립스 시작하기</Btn>
        </EndPage>
      </OpacityModal>
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

  div > h3:not(.h3) {
    font-size: ${(props) => props.theme.size.xs};
    line-height: 130%;
    color: #df0c0c;
    margin-top: calc(${(props) => props.theme.size.xs} / 3);
  }

  .h3 {
    color: black;
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
  height: 80%;

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

const BottomBtn = styled(Btn)`
  position: absolute;
  bottom: 0;
  width: calc(100% - (${(props) => props.theme.size.m} * 2));
  margin-bottom: ${(props) => props.theme.size.m};
`;

export default SignUpPage;
