import React from "react";
import styled from "styled-components";

const MoveLeftModal = (props) => {
  return (
    <>
      <Container toggle={props.toggle}>{props.children}</Container>
    </>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => (props.toggle ? "0%" : "100%")};
  z-index: ${(props) => (props.toggle ? 1 : 0)};
  height: 100%;
  width: 100%;
  transition-duration: 0.8s;
  background: white;
`;

export default MoveLeftModal;
