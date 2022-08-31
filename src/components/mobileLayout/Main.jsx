import React from "react";
import styled from "styled-components";

const Main = (props) => {
  return <Container>{props.children}</Container>;
};

const Container = styled.main`
  flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 2rem;
`;

export default Main;
