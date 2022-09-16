import styled from "styled-components";

import { InputDiv } from "components/common";

const TopSearch = styled(InputDiv)`
  cursor: pointer;
  position: relative;

  padding: 0 calc(${(props) => props.theme.size.m} / 2);

  border: none;
  border-radius: calc(${(props) => props.theme.size.s} * 3);
  box-shadow: 0px 2px 10px rgba(17, 24, 39, 0.15);

  input {
    font-size: ${(props) => props.theme.size.m};
  }
  .icon {
    fill: ${(props) => props.theme.color.disable};
  }
`;

export default TopSearch;
