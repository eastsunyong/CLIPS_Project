import styled from "styled-components";

const Btn = styled.button`
  width: 100%;
  padding: ${(props) => props.theme.size.xs};

  border: 0.1rem solid ${(props) => props.theme.color.brand};
  border-radius: calc(${(props) => props.theme.size.m} / 2);
  background: ${(props) => (props.outLine ? "white" : props.theme.color.brand)};

  font-weight: bold;
  font-size: ${(props) => props.theme.size.s};
  color: ${(props) => (props.outLine ? props.theme.color.brand : "white")};
`;

export default Btn;
