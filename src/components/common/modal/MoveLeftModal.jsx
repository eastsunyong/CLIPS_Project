import React from "react";
import styled from "styled-components";

const MoveLeftModal = (props) => {
  return (
    <>
      <Section toggle={props.toggle}>{props.children}</Section>
    </>
  );
};

const Section = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => (props.toggle ? "0%" : "100%")};
  z-index: ${(props) => (props.toggle ? 100 : 0)};
  height: 100%;
  width: 100%;
  transition-duration: 0.7s;
  background: white;
`;

export default MoveLeftModal;
