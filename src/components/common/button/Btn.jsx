import styled from "styled-components";

/**
 * 1. outLine : Boolean
 */
const Btn = styled.button`
  width: 100%;
  padding: 0.8rem;

  border: 0.1rem solid ${(props) => props.theme.color.brand};
  border-radius: 0.4rem;
  background: ${(props) => (props.outLine ? "white" : props.theme.color.brand)};

  color: ${(props) => (props.outLine ? props.theme.color.brand : "white")};
  font-weight: bold;
  font-size: 1.4rem;
`;

export default Btn;
