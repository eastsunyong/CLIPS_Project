import React from "react";
import styled from "styled-components";

const ToggleReview = (props) => {
  const toggleType = ["후기쓰기", "작성한 후기"];

  return (
    <ToggleNav>
      {toggleType.map((type) => {
        return (
          <Toggle
            key={type}
            selected={type === "후기쓰기" ? props.selected : !props.selected}
            onClick={() => {
              props.setSelected(!props.selected);
            }}
          >
            {type}
          </Toggle>
        );
      })}
    </ToggleNav>
  );
};

export default ToggleReview;

const ToggleNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;

  height: calc(${(props) => props.theme.size.m} * 2);
  padding: 0 calc(${(props) => props.theme.size.xs} * 2);

  border-bottom: 0.1rem solid rgba(75, 85, 99, 0.2);

  font-size: ${(props) => props.theme.size.s};
`;

const Toggle = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: inherit;

  border-bottom: 0.3rem solid ${(props) => (props.selected ? props.theme.color.brand : props.theme.color.hidden)};

  color: ${(props) => (props.selected ? props.theme.color.brand : "inherit")};
  font-weight: bold;
`;
