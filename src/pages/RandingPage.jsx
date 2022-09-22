import React from "react";
import styled from "styled-components";

import brandLogo from "assets/img/brandLogo.png";

const RandingPage = () => {
  return (
    <Section>
      <img src={brandLogo} alt="로고" />
      <span>CLIPs</span>
    </Section>
  );
};

export default RandingPage;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  background: ${(props) => props.theme.color.brand};

  color: white;
  font-size: calc(${(props) => props.theme.size.xs} * 4);
  font-weight: bold;
`;
