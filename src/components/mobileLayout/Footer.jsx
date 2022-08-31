import React from "react";
import styled from "styled-components";
import { HiLocationMarker, HiOutlineLocationMarker } from "react-icons/hi";
import { IoPersonCircle, IoPersonCircleOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const nav = useNavigate();
  const pathname = useLocation().pathname;
  return (
    <FooterNav>
      <div onClick={() => nav("/")}>
        {pathname === "/" ? <HiLocationMarker /> : <HiOutlineLocationMarker />}
        <p>장소 검색</p>
      </div>
      <div onClick={() => nav("/login")}>
        {pathname === "/list" ? <IoPersonCircle /> : <IoPersonCircleOutline />}
        <p>약속 목록</p>
      </div>
    </FooterNav>
  );
};

const FooterNav = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  min-height: 8rem;
  padding: 0 2rem;

  box-shadow: 0 -0.3rem 0.3rem -0.3rem;
  div {
    cursor: pointer;
    width: 5rem;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;

    font-size: 4rem;
    & > :nth-child(2) {
      margin-top: 0.5rem;
      font-size: 1rem;
    }
  }
`;

export default Footer;
