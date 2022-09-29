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
          <p>Chronically</p>
          <p>Late - </p>
          <p>Insane</p>
          <p>People !</p>
        </Comment>

        <Content>
          <MobileFrame url={mobileFrame} />
          <FrameTop />
          <Feature>{children}</Feature>
        </Content>
      </Container>
    </Section>
  );
};

export default Web;

const Section = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column;

  width: 100vw;
  height: 100vh;
  padding: 4rem;

  background: black;
`;

const Logo = styled.div`
  color: ${(props) => props.theme.color.brand};
  font-family: "Prompt", sans-serif;
  font-style: italic;
  font-size: 4rem;
  font-weight: 900;
`;

const Container = styled.div`
  position: relative;
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Comment = styled.div`
  position: absolute;
  left: 8rem;

  color: #dafd60;
  font-size: 10.4rem;
  font-weight: 800;

  & > * {
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
  display: flex;
  flex-flow: column;

  width: 42.5rem;
  height: 85rem;
  padding: 2.6rem 2.85rem 2.4rem 2.6rem;
`;

const MobileFrame = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: ${(props) => `url(${props.url})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const FrameTop = styled.div`
  width: 100%;
  height: 4rem;

  background: white;
`;

const Feature = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  overflow: hidden;

  width: 100%;
  height: 100%;

  border: 0.1rem solid ${(props) => props.theme.color.disable};
  border-radius: 0 0 3.5rem 3.5rem;

  background: white;
`;
