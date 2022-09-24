import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import { Map, Calendar, Review, My } from "assets/icons";

const Footer = () => {
  const nav = useNavigate();
  const pathname = useLocation().pathname;
  const icons = [
    { path: "/", component: <Map className="lg" /> },
    { path: "/promised", component: <Calendar className="lg" /> },
    { path: "/review", component: <Review className="lg" /> },
    { path: "/mypage", component: <My className="lg" /> },
  ];
  return (
    <Container>
      {icons.map((icon) => {
        return (
          <FooterBtn
            key={icon.path}
            selected={icon.path === pathname}
            onClick={() => {
              if (pathname !== icon.path) nav(icon.path);
            }}
          >
            {icon.component}
          </FooterBtn>
        );
      })}
    </Container>
  );
};

const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: ${(props) => props.theme.level.front.middle};

  background: ${(props) => props.theme.color.black.dark};
  box-shadow: 0 -0.4rem 1rem rgba(17, 24, 39, 0.15);
`;

const FooterBtn = styled.div`
  cursor: pointer;
  padding: 1.6rem;
  color: ${(props) => (props.selected ? props.theme.color.brand : props.theme.color.disable)};
`;

export default Footer;
