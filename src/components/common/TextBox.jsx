import styled from "styled-components";

const TextBox = styled.div`
  font-size: ${(props) => props.theme.size.xs};
  color: ${(props) => props.theme.color.disable};

  *:not(:last-child) {
    margin-bottom: calc(${(props) => props.theme.size.m} / 2);
  }

  .title {
    font-size: ${(props) => props.theme.size.m};
    font-weight: bold;
    color: black;
  }
`;

export default TextBox;
