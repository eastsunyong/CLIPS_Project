import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { typeToggle } from "store/modules/reviewSlice";

const ToggleReview = ({ type }) => {
  const dispatch = useDispatch();
  const titleList = ["후기 쓰기", "작성된 후기"];

  return (
    <ToggleNav>
      {titleList.map((title) => {
        return (
          <Toggle
            key={title}
            selected={title === "후기 쓰기" ? type : !type}
            onClick={() => {
              dispatch(typeToggle());
            }}
          >
            {title}
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

  height: 3.6rem;
  padding: 0 2.4rem;

  border-bottom: 0.1rem solid ${(props) => props.theme.color.disable};

  font-size: 1.4rem;
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
