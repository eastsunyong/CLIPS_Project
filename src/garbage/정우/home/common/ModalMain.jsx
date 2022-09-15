import styled from "styled-components";

const ModalMain = styled.form`
  flex-flow: column;
  justify-content: flex-start !important;
  width: 100%;
  height: calc(100% - (${(props) => props.theme.fontSize.s} * 1.2 + ${(props) => props.theme.size.s}));
  padding: 0 ${(props) => props.theme.size.s};
  input {
    cursor: pointer;
    width: 100%;
    padding: ${(props) => props.theme.size.s};
    outline: none;
    border: none;
    font-size: calc(${(props) => props.theme.fontSize.s});
  }
`;

export default ModalMain;
