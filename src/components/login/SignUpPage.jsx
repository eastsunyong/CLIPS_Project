import React from "react";
import styled from "styled-components";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";

import { minusNumber } from "store/modules/loginSlice";

const SignUpPage = (props) => {

    const dispatch = useDispatch();

    const down= (e)=> {
        dispatch(minusNumber(1))
    }


    //이미지 미리보기 저장하는  곳
    const [attachment, setAttachment] = useState();
    //이미지 저장하는 곳
    const fileInput = useRef(null);

    //이메일 정규식 맞는지 확인
    const regPass = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

                   

    const {
        getValues,
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    //오류 메세지 확인
    const onValid = (data) => console.log(data, "onvalid");
    const onInvalid = (data) => console.log(data, "onInvalid");


    //이메일 체크 함수
    const onEmailCheck = (data) => {
        const email = getValues("email")
        if (email === '' || regPass.test(email) === false) {
            setError(
                "email",
                { message: "다시 확인해주세요" },
                { shouldFocus: true }
                );
            } else {
            emailCheckHandler(email);
        }
    }

    //이메일 체크 핸들러
    const emailCheckHandler = async (email) => {
        await axios.post('/api/auth/email', {email})
        console.log(email)
    }

    //닉네임 체크 함수
    const onNickCheck = (data) => {
        const nickname = getValues("nickname")
        if (nickname === '' || nickname.length > 8) {
            setError(
                "nickname",
                { message: "다시 확인해주세요" },
                { shouldFocus: true }
                );
            }else {
                NicknameCheckHandler(nickname)
        }
    }

    //닉네임 체크 핸들러
    const NicknameCheckHandler = async (nickname) => {
        await axios.post('/api/auth/nickname', {nickname})
    }

    //회원가입 함수
    const onSubmit = (data) => {
        SignUpHandler(data)
    }

    //회원가입 핸들러
    const SignUpHandler = async (data) => {
        //비밀번호 확인 조건문
        if (data.password !== data.confirmpassword) {
            setError(
                "confirmpassword",
                { message: "비밀번호가 일치하지 않습니다" },
                { shouldFocus: true }
            );
        }
        const formData = new FormData();
        formData.append('image', fileInput.current.files[0])
        formData.append('email', data.email)
        formData.append('name', data.name)
        formData.append('nickname', data.nickname)
        formData.append('password', data.password)
        formData.append('confirm', data.confirmpassword)
        formData.append('phone', data.phone)

        await axios.post(process.env.REACT_APP_SURVER + '/api/auth/signup', formData)
    }

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
        <Container>
            <div className="fcc" style={{ flexDirection: "column" }}>
                <UserImage src={
                    attachment
                        ? attachment
                        : "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800"
                }
                    alt="업로드할 이미지" />
                <form encType="multipart/form-data">
                <ChoiceImg>
                <label htmlFor="이미지">
                        <h4>사진 선택하기</h4>
                    <input style={{display:"none"}}
                        id="이미지"
                        type="file"
                        name="image"
                        ref={fileInput}
                        onChange={selectImg}
                    />
                    </label>
                </ChoiceImg>
                </form>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ flexDirection: "column", display: "flex" }}    >
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
                    <Btndiv>
                        <button type="button" onClick={() => { onEmailCheck() }}>이메일 확인 버튼</button>
                    </Btndiv>

                    <div style={{ flexDirection: "row", display: "flex", gap: "2rem" }}>
                        <label>이름</label>
                        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                    </div>
                    <input
                        {...register("name", { required: "이름 입력은 필수 입력입니다", minLength: { value: 1, message: "최소 1글자 이상 적어주세요" },
                        maxLength: { value: 20, message: "최대 20글자 입니다" }  })}
                        placeholder="이름"
                        maxLength="21"
                    />
                </div>
                <div style={{ flexDirection: "column", display: "flex" }}    >
                    <div style={{ flexDirection: "row", display: "flex", gap: "2rem" }}>
                        <label>닉네임</label>
                        {errors.nickname && <p style={{ color: "red" }}>{errors.nickname.message}</p>}
                    </div>
                    <input
                        {...register("nickname", { required: "닉네임은 필수 입력입니다", maxLength: { value: 8, message: "8자 이하로 정해주세요" } })}
                        placeholder="닉네임"
                        maxLength="9"
                    />
                </div>
                <Btndiv>
                    <button type="button" onClick={() => { onNickCheck()}}>닉네임 확인 버튼</button>
                </Btndiv>
                <div style={{ flexDirection: "column", display: "flex", marginBottom: "2rem" }}    >
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
                </div>
                <div style={{ flexDirection: "column", display: "flex", marginBottom: "2rem" }}    >
                    <div style={{ flexDirection: "row", display: "flex", gap: "2rem" }}>
                        <label>비밀번호 확인</label>
                        {errors.confirmpassword && <p>{errors.confirmpassword.message}</p>}
                    </div>
                    <input
                        {...register("confirmpassword", {
                            required: "비밀번호는 확인은 필수입니다",
                            minLength: { value: 8, message: "8자리 이상 비밀번호를 사용하세요."},
                            maxLength: { value: 16, message: "16자리 이하 비밀번호를 사용하세요." },
                            pattern: { value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, message: "특수문자와 숫자를 포함해주세요" },
                        })}
                        placeholder="비밀번호 (특수문자, 숫자 포함)"
                        type="password"
                    />
                </div>
                <div style={{ flexDirection: "column", display: "flex", marginBottom: "2rem" }}    >
                    <div style={{ flexDirection: "row", display: "flex", gap: "2rem" }}>
                        <label>전화번호</label>
                        {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}
                    </div>
                    <input
                        {...register("phone", {
                            required: "전화번호는 필수 입력입니다",  minLength: { value: 10, message: "휴대번호는 최소 10자리입니다"},
                            maxLength: { value: 11, message: "휴대번호는 최대 11자리입니다" },
                            pattern: { value: /^01[0-1, 7][0-9]{7,8}$/, message: "휴대전화가 아닙니다" },
                        })}

                        placeholder="숫자로만 입력해주세요"
                    />
                    <button >실행임</button>
                    <button type="button" onClick={()=> {props.setToggle(false)}} >뒤로 가기</button>
                </div>
            </form>

        </Container>

    )
}

const UserImage = styled.img`
    border: 1px solid salmon;
    width: 25rem;
    height: 25rem;
    border-radius: 50%;
    margin-bottom: 2rem;
`

const ChoiceImg = styled.div`
    width: 130px;
    height: 30px;
    border: 1px solid ${(props) => props.theme.themeColor};
    align-items: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;

    

    h4 {
        cursor: pointer;
        font-size: 1.3rem;
    }

    :hover{
        background-color: ${(props) => props.theme.themeColor};
        color: white;
    }
`

const Container = styled.div`

    position: relative;
  flex-flow: column;
  min-width: 100%;
  min-height: 100%;
  padding: 0 2rem 2rem 2rem;
  flex-direction: column;

    label {
        font-size: 1.8rem;
    }

    input {
        width: 35rem;
        height: 5rem;
        border-radius: 2rem;
        border: 1px solid skyblue;
        background-color: aliceblue;
        padding: 1rem;
    }

    form > input {
        background-color: white;
        height: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p{
        font-size: 12px;
        color: red;
        margin-top: 0.5rem;
        opacity: 0.8;
    }
`

const Btndiv = styled.div`
    display: flex;
    justify-content: right;
`


export default SignUpPage;