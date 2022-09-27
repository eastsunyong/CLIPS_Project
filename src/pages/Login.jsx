import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Intro } from "components/page/login";
import { Btn } from "components/common";
import { RandingPage } from ".";

const Login = () => {
  const [toggle, setToggle] = useState();
  const isLoading = useSelector((state) => state.review.isLoading);

  return (
    <>
     {isLoading && <RandingPage />}
      <Section>
        <p>로그인하고</p>
        <p>더 많은 기능을 만나보세요!</p>
        <Btn onClick={() => setToggle(!toggle)}>로그인 / 회원가입</Btn>
      </Section>
      <Intro toggle={toggle} setToggle={setToggle} />
    </>
  );
};

export default Login;

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  width: 100%;
  height: 100%;
  padding: 1.6rem;

  font-size: 2rem;
  font-weight: bold;

  & > p {
    margin-bottom: 1rem;
  }

  & > button {
    margin: 1rem 0;
  }
`;
