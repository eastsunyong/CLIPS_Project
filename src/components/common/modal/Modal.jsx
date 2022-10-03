import styled from "styled-components";

/**
 * 1. type : String => top, left 이동 제어
 * 2. toggle : Boolean => visible 제어
 */
const Modal = styled.div`
  display: flex;
  flex-flow: column;

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
