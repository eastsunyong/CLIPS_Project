import React from "react";
import styled from "styled-components";

const RandingPage = () => {
  return (
    <Container>
      <p>우리의 약속,</p>
      <p>이것으로 끝.</p>
      <p className="brand">CLIPs</p>
    </Container>
  );
};

export default RandingPage;

const Container = styled.div`
  position: absolute;
  z-index: 10000;

  height: 100%;
  width: 100%;
  padding: 4.8rem 2.4rem;

  background: #1a1b1f;

  color: white;
  font-size: 3.2rem;
  font-weight: 600;

  p {
    margin-bottom: 0.6rem;
  }

  .brand {
    color: ${(props) => props.theme.color.brand};
    font-size: 5.6rem;
    font-weight: 800;
  }
`;
