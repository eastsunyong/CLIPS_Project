import styled from "styled-components";

/**
 * 1. toggle : Boolean => visible 제어
 */
const OpacityModal = styled.div`
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;
  z-index: ${(props) => (props.toggle ? props.theme.level.front.top : props.theme.level.back)};
  opacity: ${(props) => (props.toggle ? 1 : 0)};

  transition-duration: 0.3s;

  background: white;
`;

export default OpacityModal;
