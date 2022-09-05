import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { MapIcon, MyIcon } from "assets/icons";

const Footer = () => {
  const nav = useNavigate();
  return (
    <FooterNav>
      <div onClick={() => nav("/")}>
        <MapIcon />
        <p>장소 검색</p>
      </div>
      <div onClick={() => nav("/login")}>
        <MyIcon />
        <p>약속 목록</p>
      </div>
    </FooterNav>
  );
};

const FooterNav = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 10;

  min-height: 8rem;
  padding: 0 2rem;

  box-shadow: 0 -0.4rem 1rem rgba(17, 24, 39, 0.15);
  div {
    cursor: pointer;
    width: 5rem;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;

    font-size: 4rem;
    & > :nth-child(1) {
      width: 3rem;
      height: 3rem;
    }
    & > :nth-child(2) {
      margin-top: 0.5rem;
      font-size: 1rem;
    }
  }
`;

export default Footer;
