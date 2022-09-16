import styled from "styled-components";

const InputDiv = styled.div`
  display: flex;
  width: 100%;

  overflow: hidden;

  border: 0.1rem solid gray;
  border-radius: calc(${(props) => props.theme.size.m} / 2);
  background: white;

  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input,
  textarea {
    cursor: pointer;
    outline: none;
    border: none;

    width: inherit;
    padding: ${(props) => props.theme.size.xs} ${(props) => props.theme.size.m};

    font-size: ${(props) => props.theme.size.s};
    font-weight: bold;
    resize: none;
  }

  .icon {
    padding-right: ${(props) => props.theme.size.m};
  }
`;

export default InputDiv;
