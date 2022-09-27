import React, { useState } from "react";
import styled from "styled-components";

import { Menu } from "assets/icons";

const DropDownMenu = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Box>
      <ThreeDot
        onClick={(e) => {
          e.stopPropagation();
          setToggle(!toggle);
        }}
      >
        <Menu className="sm" />
      </ThreeDot>
      <MenuList toggle={toggle}>{children}</MenuList>
    </Box>
  );
};

const Box = styled.div`
  position: relative;
  height: 100%;
`;

const ThreeDot = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: center !important;
  align-items: center;

  width: 2rem;
  height: 2rem;
`;

const MenuList = styled.ul`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  left: ${(props) => (props.toggle ? "-100%" : 0)};
  visibility: ${(props) => (props.toggle ? "visible" : "hidden")};
  transition-duration: 0.4s;

  width: 100%;
  height: 100%;

  background: white;
  border-radius: 2.5rem;
`;

export default DropDownMenu;
