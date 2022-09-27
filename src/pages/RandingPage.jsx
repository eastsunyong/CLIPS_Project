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
  height: 100%;
  padding: 4.8rem 2.4rem;

  background: #1a1b1f;

  color: white;
  font-size: 3.2rem;
  font-weight: bold;

  p {
    margin-bottom: 0.6rem;
  }

  .brand {
    color: ${(props) => props.theme.color.brand};
    font-size: 5.6rem;
  }
`;
