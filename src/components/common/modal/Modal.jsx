import styled from "styled-components";

const Modal = styled.div`
  height: 100%;
  width: 100%;

  position: absolute;
  top: ${(props) => (props.type === "top" ? (props.toggle ? "0%" : "100%") : "0%")};
  left: ${(props) => (props.type === "top" ? "0%" : props.toggle ? "0%" : "100%")};
  z-index: ${(props) => (props.toggle ? props.theme.level.front.top : props.theme.level.back)};

  transition-duration: 0.7s;

  background: white;
`;

export default Modal;
