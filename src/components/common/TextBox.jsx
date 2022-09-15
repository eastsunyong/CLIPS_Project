import styled from "styled-components";

const TextBox = styled.div`
  width: 100%;
  font-size: ${(props) => props.theme.size.xs};
  color: ${(props) => props.theme.color.disable};

  .title {
    margin-bottom: calc(${(props) => props.theme.size.m} / 2);
    font-size: ${(props) => props.theme.size.m};
    font-weight: bold;
    color: black;
  }
`;

export default TextBox;
