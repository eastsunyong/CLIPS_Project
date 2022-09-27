import React, { useState } from "react";
import { useEffect } from "react";

import { SignupStep1, SignupStep2 } from ".";

const Signup = ({ register, getValues, watch, setError, errors, choice }) => {
  const [next, setNext] = useState(false);

  // 회원가입 초기화
  useEffect(() => {
    if (choice.toggle) {
      setNext(false);
    }
  }, [choice]);

  return (
    <>
      {next ? (
        <SignupStep2 register={register} getValues={getValues} watch={watch} setError={setError} errors={errors} />
      ) : (
        <SignupStep1 setNext={setNext} />
      )}
    </>
  );
};

export default Signup;
