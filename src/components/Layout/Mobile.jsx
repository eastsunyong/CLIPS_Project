import React, { useEffect } from "react";
import styled from "styled-components";

const Mobile = (props) => {
  const setScreenSize = () => {
    // 모바일 화면에서 주소창 및 하단 nav바를 제외한 100vh구하기
    let vh = window.innerHeight * 0.01;
    // 넓이 따른 100%
    let mw = window.innerWidth >= 640 ? "375px" : "100%";
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--mw", mw);
  };

  useEffect(() => {
    setScreenSize();
    window.addEventListener("resize", setScreenSize);
    return () => {
      window.removeEventListener("resize", setScreenSize);
    };
  }, []);

  return <Section id="serviceItem">{props.children}</Section>;
};

export default Mobile;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  max-width: var(--mw);
  // 모바일 화면에서 주소창 및 하단 nav바를 제외한 높이를 1vh라고하고 * 100vh
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
`;
