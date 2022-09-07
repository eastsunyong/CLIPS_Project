import React from "react";
import styled from "styled-components";

const Main = (props) => {
  return <Section>{props.children}</Section>;
};

const Section = styled.main`
  flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Main;
