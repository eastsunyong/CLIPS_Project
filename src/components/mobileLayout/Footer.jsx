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
    { path: "/myPage", component: <MyIcon /> },
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
  z-index: ${(props) => props.theme.level.front.middle};

  box-shadow: 0 -0.4rem 1rem rgba(17, 24, 39, 0.15);
`;

const FooterNav = styled.div`
  cursor: pointer;
  padding: ${(props) => props.theme.size.l};
  fill: ${(props) => (props.selected ? props.theme.color.brand : props.theme.color.disable)};
  & > :first-child {
    width: calc(${(props) => props.theme.size.xs} * 2);
    height: calc(${(props) => props.theme.size.xs} * 2);
  }
`;

export default Footer;