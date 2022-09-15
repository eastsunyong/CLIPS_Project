import React from "react";
import styled from "styled-components";
import { RiPencilLine } from "react-icons/ri";

import defaultImg from "assets/img/UserDefaultImg.png";

const User = () => {
  return (
    <Section className="fcc">
      <Profile>
        <img src={defaultImg} />
      </Profile>
      <Info>
        <NickName>
          <span>강쥐들은 천사야 </span>님
          <RiPencilLine />
        </NickName>
        <Phone>01000000000</Phone>
      </Info>
    </Section>
  );
};

const Section = styled.div`
  justify-content: flex-start !important;
  padding: calc(${(props) => props.theme.size.m} * 2) ${(props) => props.theme.size.m};
`;
const Profile = styled.div`
  width: calc(${(props) => props.theme.size.m} * 3);
  height: calc(${(props) => props.theme.size.m} * 3);
  border-radius: 50%;
  overflow: hidden;
  img {
    width: inherit;
    height: inherit;
  }
`;
const Info = styled.div`
  margin-left: ${(props) => props.theme.size.m};
  font-size: ${(props) => props.theme.size.xs};
`;
const NickName = styled.p`
  font-size: ${(props) => props.theme.size.l};
  span {
    font-weight: bold;
  }
  & > :last-child {
    cursor: pointer;
    margin-left: calc(${(props) => props.theme.size.m} / 2);
    color: ${(props) => props.theme.color.disable};
  }
`;
const Phone = styled.p`
  color: ${(props) => props.theme.color.disable};
`;

export default User;
