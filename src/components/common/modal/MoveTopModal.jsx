import React from "react";
import styled from "styled-components";

const Modal = (props) => {
  // const viewHeight = props.toggle ? "0%" : props.viewSlice ? "-20rem" : "-100%";
  return (
    <>
      <Section toggle={props.toggle}>{props.children}</Section>
    </>
  );
};

const Section = styled.div`
  position: absolute;
  left: 0;
  top: ${(props) => (props.toggle ? "0%" : `calc(100% - (${props.theme.size.m} * 2))`)};
  z-index: ${(props) => (props.toggle ? 10 : 0)};
  width: 100%;
  transition-duration: 0.8s;
`;

export default Modal;
