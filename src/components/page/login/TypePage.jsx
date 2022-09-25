import React, { memo, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { Modal, Pagefield } from "components/common";
import { LeftArrow } from "assets/icons";
import { Signin, Signup, WelcomePage } from ".";
import { __signin } from "store/modules/loginSlice";
import { loginAPI } from "apis";
import { sweetalert } from "utils";
import { useEffect } from "react";

const TypePage = ({ choice, setChoice }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [welcome, setWelcome] = useState({ toggle: false, data: { email: null, password: null } });

  const signin = (data) => {
    dispatch(__signin(data));
  };

  const typeSubmit = async (data) => {
    if (choice.type === "회원가입") {
      const answer = await loginAPI.signup(data);
      if (answer.result) {
        sweetalert.timer(answer.msg, "success");
        setWelcome({ toggle: true, data: { email: data.email, password: data.password } });
      }
      // 이미지 업로드 기능 추가시 활성화
      // const formData = new FormData();
      // Object.keys(data).forEach((key) => {
      //   formData.append(key, data[key]);
      // });
    } else {
      signin(data);
    }
  };

  useEffect(() => {
    if (choice.toggle) {
      reset();
    }
  }, [choice, reset]);

  return (
    <>
      <Modal toggle={choice.toggle}>
        <Pagefield
          icon={
            <div
              className="btn"
              onClick={() => {
                setChoice({ ...choice, toggle: !choice.toggle });
              }}
            >
              <LeftArrow className="sm" />
            </div>
          }
          title={`${choice.type}`}
        >
          <FormArea onSubmit={handleSubmit(typeSubmit)}>
            {choice.type === "회원가입" ? (
              <Signup choice={choice} register={register} getValues={getValues} watch={watch} setError={setError} errors={errors} />
            ) : (
              <Signin register={register} errors={errors} />
            )}
          </FormArea>
        </Pagefield>
      </Modal>
      <WelcomePage welcome={welcome} signin={signin} />
    </>
  );
};

export default memo(TypePage);

const FormArea = styled.form`
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;

  padding-top: 1.6rem;

  .inputArea {
    flex: 1;
    overflow: scroll;
  }

  .inputArea > *:not(:last-child) {
    margin-bottom: 1.6rem;
  }

  .titie {
    margin-bottom: 0.8rem;

    font-size: 1.2rem;
    font-weight: bold;
  }

  .error {
    margin-top: 0.8rem;

    color: ${(props) => props.theme.color.error.main};
    font-size: 1.2rem;
  }
`;
