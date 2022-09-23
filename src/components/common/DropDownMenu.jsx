import React, { useState } from "react";
import styled from "styled-components";

import { MenuIcon } from "assets/iconList";

const DropDownMenu = (props) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Box>
      <ThreeDot
        onClick={(e) => {
          e.stopPropagation();
          setToggle(!toggle);
        }}
      >
        <MenuIcon />
      </ThreeDot>
      <Menu toggle={toggle}>{props.children}</Menu>
    </Box>
  );
};

const Box = styled.div`
  position: relative;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThreeDot = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: center;

  width: ${(props) => props.theme.size.xl};
  height: ${(props) => props.theme.size.xl};
`;

const Menu = styled.ul`
  position: absolute;
  bottom: ${(props) => (props.toggle ? "-100%" : 0)};
  visibility: ${(props) => (props.toggle ? "visible" : "hidden")};
  transition-duration: 0.4s;

  height: 100%;

  background: white;
  border-radius: 2.5rem;
`;

export default DropDownMenu;
