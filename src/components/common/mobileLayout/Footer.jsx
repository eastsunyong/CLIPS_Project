import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import { MapIcon, MyIcon, CalendarIcon } from "assets/icons";

const Footer = () => {
  const nav = useNavigate();
  const pathname = useLocation().pathname;
  const icons = [
    { path: "/", component: <MapIcon /> },
    { path: "/list", component: <CalendarIcon /> },
    { path: "/login", component: <MyIcon /> },
  ];
  return (
    <Section>
      {icons.map((icon) => {
        return (
          <FooterNav
            key={icon.path}
            selected={icon.path === pathname}
            className="fcc"
            onClick={() => {
              if (pathname !== icon.path) nav(icon.path);
            }}
          >
            {icon.component}
          </FooterNav>
        );
      })}
    </Section>
  );
};

const Section = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 10;

  min-height: 8rem;
  box-shadow: 0 -0.4rem 1rem rgba(17, 24, 39, 0.15);
`;

const FooterNav = styled.div`
  cursor: pointer;
  width: calc(${(props) => props.theme.size.m} * 2);
  height: 100%;
  fill: ${(props) => (props.selected ? props.theme.themeColor : props.theme.iconsColor.disable)};
  & > :nth-child(1) {
    width: ${(props) => props.theme.size.m};
    height: ${(props) => props.theme.size.m};
  }
`;

export default Footer;
