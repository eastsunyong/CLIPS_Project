import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Modal = (props) => {
  const ref = useRef(null);
  const [clientHeight, setClientHeight] = useState("");
  useEffect(() => {
    setClientHeight(-ref.current.clientHeight + "px");
  }, []);
  return (
    <>
      <Section ref={ref} clientHeight={clientHeight} toggle={props.toggle} pathname={props.pathname} viewTitle={props.viewTitle}>
        {props.children}
      </Section>
    </>
  );
};

const Section = styled.div`
  position: absolute;
  left: 0;
  bottom: ${(props) => {
    let bottom = "";
    if (props.toggle) {
      bottom = "0%";
    } else {
      bottom = `calc(${props.clientHeight}`;
      bottom += props.pathname === "/" ? ` + ${props.theme.lineHeight}` : "";
      bottom += props.viewTitle ? ` + (4.5rem + ${props.theme.size.xs} * 4)` : "";
      bottom += ")";
    }
    return bottom;
  }};
  z-index: ${(props) => (props.toggle ? 10 : 2)};
  width: 100%;
  height: 100%;
  transition-duration: 0.8s;
`;

export default Modal;
