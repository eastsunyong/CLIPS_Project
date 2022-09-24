import React, { useEffect } from "react";
import styled from "styled-components";

const Mobile = (props) => {
  // 모바일 화면에서 주소창 및 하단 nav바를 제외한 100vh구하기
  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };
  useEffect(() => {
    setScreenSize();
  });
  return <Section>{props.children}</Section>;
};

export default Mobile;

const Section = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
  overflow: hidden;

  max-width: 375px;
  // 모바일 화면에서 주소창 및 하단 nav바를 제외한 높이를 1vh라고하고 * 100vh
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
`;
