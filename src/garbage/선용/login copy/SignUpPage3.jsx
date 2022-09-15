import React from "react";
import styled from "styled-components";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

//아이콘
import { AiOutlineLeft, AiOutlineCamera } from "react-icons/ai";

const SignUpPage3 = (props) => {
  //닉네임 잠금
  const [nickNonTouch, setNickNonTouch] = useState(false);
  //이미지 미리보기 저장하는  곳
  const [attachment, setAttachment] = useState();
  //이미지 저장하는 곳
  const fileInput = useRef(null);

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

  const {
    getValues,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" });

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
      await axios.post(process.env.REACT_APP_SURVER + `/api/auth/nickname`, { nickname }).then((res) => {
        const msg = res.data.message;
        console.log(res);
        alert(msg);
        setNickNonTouch(true);
      });
    } catch {
      alert("시랲패");
    }
  };

  return (
    <All>
      <Container className="fcc">
        <Header>
          <p>
            <AiOutlineLeft
              onClick={() => {
                props.setToggle(false);
              }}
            />
          </p>
          <h2>회원가입</h2>
        </Header>
        <div className="fcc" style={{ flexDirection: "column" }}>
          <UserImage
            src={
              attachment
                ? attachment
                : "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800"
            }
            alt="업로드할 이미지"
          />
          <span>
            <p>
              <AiOutlineCamera />
            </p>
          </span>
          <form encType="multipart/form-data">
            <div>
              <label htmlFor="이미지">
                <h4>사진 선택하기</h4>
                <input style={{ display: "none" }} id="이미지" type="file" name="image" ref={fileInput} onChange={selectImg} />
              </label>
            </div>
          </form>
        </div>
        <form onSubmit={handleSubmit()}>
          <label>닉네임</label>
          <Center>
            <input
              {...register("nickname", { required: "닉네임은 필수 입력입니다", maxLength: { value: 8, message: "8자 이하로 정해주세요" } })}
              placeholder="닉네임을 입력해주세요"
              maxLength="9"
              className={nickNonTouch ? "unable" : ""}
            />
            <button
              className={nickNonTouch ? "unable" : ""}
              type="button"
              onClick={() => {
                onNickCheck();
              }}
            >
              중복확인
            </button>
          </Center>
          <Onbutton>가입하기</Onbutton>
        </form>
      </Container>
    </All>
  );
};

const All = styled.div`
  position: relative;
  flex-flow: column;
  min-width: 100%;
  min-height: 100%;
  flex-direction: column;
`;

const Container = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 10px;

  label {
    font-size: 14px;
    font-weight: 700;
  }

  input {
    height: 40px;
    width: 343px;
    padding: 10px 16px 10px 16px;
    border: 1px solid #4b556380;
    border-radius: 8px;
    margin-top: 8px;
    margin-bottom: 16px;
  }

  form {
    .unable {
      opacity: 0.5;
      pointer-events: none;
    }
  }
`;

const UserImage = styled.img`
  border: 1px solid salmon;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 2rem;

  span > p {
    position: absolute;
    top: 200px;
    left: 0;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5rem;
  font-weight: 700;
  align-items: center;
  margin-bottom: 42px;

  p {
    font-size: 20px;
    cursor: pointer;
    margin-right: 24px;
    font-weight: 500;
    margin-top: 4px;
  }

  h2 {
    font-size: 20px;
    margin-top: 0px;
    line-height: 24.96px;
    font-weight: 700;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  justify-content: center;

  input {
    height: 40px;
    width: 259px;
    padding: 10px 16px 10px 16px;
    border: 1px solid #4b556380;
    border-radius: 8px;
  }

  button {
    width: 80px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.themeColor};
    color: ${(props) => props.theme.themeColor};
    font-weight: 600;
    font-size: 14px;
    background-color: white;
    margin-bottom: 8px;
  }
`;

const Onbutton = styled.button`
  margin-top: 200px;
  width: 343px;
  height: 41px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => props.theme.themeColor};
  color: white;
`;

export default SignUpPage3;
