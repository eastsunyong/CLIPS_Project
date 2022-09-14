import styled from "styled-components";

const IconBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(${(props) => props.theme.size.m} * 3);
  height: calc(${(props) => props.theme.size.m} * 3);
  padding: ${(props) => props.theme.size.xs};

  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  svg {
    width: ${(props) => props.theme.size.xl};
    height: ${(props) => props.theme.size.xl};
  }
`;

export default IconBtn;
