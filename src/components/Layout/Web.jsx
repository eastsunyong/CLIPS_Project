import React from "react";
import styled from "styled-components";

import { mobileFrame } from "assets/img";

const Web = ({ children }) => {
  return (
    <Section>
      <Logo>CLIPs</Logo>
      <Container>
        <Comment>
          <p>WE HATE</p>
          <p>
            Chronically
            <br />
            Late -
            <br />
            Insane
            <br />
            People !
          </p>
        </Comment>
        <Content url={mobileFrame} id="serviceItem">
          <FrameTop />
          <Screen>{children}</Screen>
        </Content>
      </Container>
    </Section>
  );
};

export default Web;

const Section = styled.div`
  display: flex;
  flex-flow: column;
  overflow: hidden;

  width: 100vw;
  height: 100vh;
  padding: 4rem 0;

  background: black;
`;

const Logo = styled.header`
  font-family: "Prompt", sans-serif;
  font-style: italic;

  padding-left: 4rem;

  color: ${(props) => props.theme.color.brand};
  font-size: 4rem;
  font-weight: 900;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  flex: 1;
  width: 100%;
`;

const Comment = styled.div`
  position: absolute;
  left: 8%;
  color: #dafd60;
  font-size: 10.4rem;
  font-weight: 800;

  p {
    font-family: "Prompt", sans-serif;
    font-style: italic;
  }

  & > :first-child {
    color: black;
    -webkit-text-stroke-width: 0.1rem;
    -webkit-text-stroke-color: #dafd60;
  }
`;

const Content = styled.div`
  position: relative;
  right: 8%;

  width: 43.1rem;
  height: 74.4rem;

  padding: 2.3rem 2.9rem 2.1rem 2.7rem;

  background: ${(props) => `url(${props.url})`} 0% 0% / 100% 100% no-repeat;
`;

const FrameTop = styled.div`
  width: 100%;
  height: 4rem;

  background: white;
`;

const Screen = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  overflow: hidden;

  width: 100%;
  height: calc(100% - 4rem);

  border: 0.1rem solid ${(props) => props.theme.color.disable};
  border-radius: 0 0 3.5rem 3.5rem;

  background: white;
`;
