import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Btn, Textfield } from "components/common";
import { loginAPI } from "apis";
import { sweetalert } from "utils";
import { UserDefaultImg } from "assets/img";
import { Camera } from "assets/icons";

const SignupStep2 = ({ register, getValues, watch, setError, errors }) => {
  const [emailCheck, setEmailCheck] = useState(false);
  const [nickCheck, setNickCheck] = useState(false);
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
      dupCheckHandler(data, type);
    }
  };

  // 중복 체크 핸들러
  const dupCheckHandler = async (data, type) => {
    let sendData = {};
    sendData[type] = data;
    const answer = await loginAPI.dupCheck(sendData);

    if (answer.result) {
      sweetalert.successAlert(answer.msg);
      type === "email" ? setEmailCheck(true) : setNickCheck(true);
    } else {
      sweetalert.failAlert(answer.msg);
      type === "email" ? setEmailCheck(false) : setNickCheck(false);
    }
  };

  // registerOpt
  const emailOpt = {
    required: "이메일은 필수 입력입니다",
    maxLength: { value: 30, message: "30자 이하로 정해주세요" },
    pattern: {
      value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
      message: "이메일이 형식에 맞지 않습니다.",
    },
    onChange: () => {
      setEmailCheck(false);
    },
    validate: () => emailCheck === true,
  };

  const nicknameOpt = {
    required: "닉네임은 필수 입력입니다",
    maxLength: { value: 8, message: "8자 이하로 정해주세요" },
    onChange: () => {
      setNickCheck(false);
    },
    validate: () => nickCheck === true,
  };

  const pwOpt = {
    required: "비밀번호는 필수 입력입니다",
    minLength: { value: 8, message: "8자리 이상 비밀번호를 사용하세요." },
    maxLength: { value: 16, message: "16자리 이하 비밀번호를 사용하세요." },
    pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, message: "특수문자와 숫자를 포함해주세요" },
  };

  const confirmOpt = {
    ...pwOpt,
    required: "비밀번호 재확인을 해주세요!",
  };

  const phoneOpt = {
    required: "전화번호는 필수 입력입니다",
    minLength: { value: 10, message: "휴대번호는 최소 10자리입니다" },
    maxLength: { value: 11, message: "휴대번호는 최대 11자리입니다" },
    pattern: { value: /^01[0-1, 7][0-9]{7,8}$/, message: "휴대전화가 아닙니다" },
  };

  //사진 미리보기
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
    <>
      <div className="inputArea">
        <UserImage className="fcc">
          <div>
            <img src={attachment ? attachment : UserDefaultImg} alt="업로드할 이미지" />
            {/* <ImgBtn htmlFor="file"> */}
            <ImgBtn onClick={() => sweetalert.avatarAlert()}>
              <Camera className="md" />
            </ImgBtn>
          </div>
        </UserImage>
        <div>
          <p className="titie">닉네임</p>
          <WithBtn>
            <Textfield bdColor={!!errors.nickname?.message}>
              <input autoComplete="off" placeholder="닉네임을 입력해주세요" {...register("nickname", nicknameOpt)} />
            </Textfield>
            <Btn outLine={true} onClick={(e) => onCheck(e, "nickname")} disabled={nickCheck}>
              중복확인
            </Btn>
          </WithBtn>
          <p className="error">{errors.nickname?.message}</p>
        </div>

        <div>
          <p className="titie">아이디</p>
          <WithBtn>
            <Textfield bdColor={!!errors.email?.message}>
              <input autoComplete="off" placeholder="이메일을 입력해주세요" {...register("email", emailOpt)} />
            </Textfield>
            <Btn outLine={true} onClick={(e) => onCheck(e, "email")} disabled={emailCheck}>
              중복확인
            </Btn>
          </WithBtn>
          <p className="error">{errors.email?.message}</p>
        </div>

        <div>
          <p className="titie">비밀번호</p>
          <Textfield bdColor={!!errors.password?.message}>
            <input type="password" autoComplete="off" placeholder="비밀번호를 입력해주세요" {...register("password", pwOpt)} />
          </Textfield>
          <p className="error">{errors.password?.message}</p>
        </div>

        <div>
          <p className="titie">비밀번호 확인</p>
          <Textfield bdColor={!!errors.confirm?.message}>
            <input type="password" autoComplete="off" placeholder="비밀번호를 한번 더 입력해주세요" {...register("confirm", confirmOpt)} />
          </Textfield>
          <p className="error">{errors.confirm?.message}</p>
        </div>

        <div>
          <p className="titie">휴대폰 번호</p>
          <Textfield bdColor={!!errors.phone?.message}>
            <input autoComplete="off" placeholder="01012345678" {...register("phone", phoneOpt)} />
          </Textfield>
          <p className="error">{errors.phone?.message}</p>
        </div>

        <div>
          <p className="titie">이름</p>
          <Textfield bdColor={!!errors.name?.message}>
            <input autoComplete="off" maxLength="9" placeholder="이름을 입력해주세요" {...register("name", { required: "이름은 필수 입력입니다" })} />
          </Textfield>
          <p className="error">{errors.name?.message}</p>
        </div>

        {/* <input id="file" type="file" accept=".png, .jpg" {...register("image")} hidden /> */}
      </div>
      <Btn>가입 완료</Btn>
    </>
  );
};

export default SignupStep2;

const UserImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 2rem;
  & > div {
    position: relative;
    width: 9rem;
    height: 9rem;
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

  width: 3.6rem;
  height: 3.6rem;
  padding: 1rem;

  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const WithBtn = styled.div`
  display: flex;
  div {
    width: 100%;
    margin-right: 0.8rem;
  }
  button {
    width: 30%;
  }
`;
