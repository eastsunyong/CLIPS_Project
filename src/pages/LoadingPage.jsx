import React from "react";
import styled from "styled-components";
import Lottie from "react-lottie-player";

import { loadingGif } from "assets/img";

const LoadingPage = () => {
  return (
    <Container>
      <CustomLottie play animationData={loadingGif} />
      <Bottom />
    </Container>
  );
};

export default LoadingPage;

const Container = styled.div`
  position: absolute;
  z-index: 10000;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  height: 100%;
  width: 100%;

  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(1px);
`;

const CustomLottie = styled(Lottie)`
  width: 12rem;
  height: 12rem;
`;

const Bottom = styled(Lottie)`
  width: 100%;
  height: calc(7.1rem + env(safe-area-inset-bottom)); ;
`;
