import React from "react";
import styled from "styled-components";

const OpacityModal = (props) => {
  return (
    <>
      <Section toggle={props.toggle}>{props.children}</Section>
    </>
  );
};

const Section = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.toggle ? 100 : 0)};
  z-index: ${(props) => (props.toggle ? 100 : -1)};
  height: 100%;
  width: 100%;
  transition-duration: 0.3s;
  background: white;
`;

export default OpacityModal;
