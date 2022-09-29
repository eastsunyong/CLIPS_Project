import React, { memo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { FormField, Modal, PageField } from "components/common";
import { LeftArrow } from "assets/icons";
import { Signin, Signup, WelcomePage } from ".";
import { __signin } from "store/modules/loginSlice";
import { loginAPI } from "apis";
import { sweetalert } from "utils";

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
        <PageField
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
          <FormField onSubmit={handleSubmit(typeSubmit)}>
            {choice.type === "회원가입" ? (
              <Signup choice={choice} register={register} getValues={getValues} watch={watch} setError={setError} errors={errors} />
            ) : (
              <Signin register={register} errors={errors} />
            )}
          </FormField>
        </PageField>
      </Modal>
      <WelcomePage welcome={welcome} signin={signin} />
    </>
  );
};

export default memo(TypePage);
