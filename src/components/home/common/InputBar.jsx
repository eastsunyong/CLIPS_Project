import React from "react";
import styled from "styled-components";

const InputBar = (props) => {
  return (
    <Section className="fcc" onClick={props.onClick}>
      {props.children}
    </Section>
  );
};

const Section = styled.div`
  cursor: pointer;
  padding: ${(props) => props.theme.size.s} calc(${(props) => props.theme.size.s} * 2);

  background: white;
  border-radius: ${(props) => props.theme.size.m};
  box-shadow: 0 0.2rem 1rem rgba(17, 24, 39, 0.15);

  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inner {
    cursor: inherit;
    border: none;
    outline: none;
    width: 100%;

    font-size: ${(props) => props.theme.fontSize.s};
    &::placeholder {
      color: ${(props) => props.theme.iconsColor.disable};
    }
  }

  .icon {
    margin-left: ${(props) => props.theme.size.s};
    fill: ${(props) => props.theme.iconsColor.disable};
  }
`;

export default InputBar;
