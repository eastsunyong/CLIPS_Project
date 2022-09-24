import React from "react";
import styled from "styled-components";

const Pagefield = (props) => {
  return (
    <Section>
      <Header>
        <div className="left">
          {props.icon}
          <div>{props.title}</div>
        </div>

        <div className="right">{props.right}</div>
      </Header>

      <Article>{props.children}</Article>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-flow: column;

  height: 100%;
  padding: 0 1.6rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2.4rem;

  font-size: 2rem;
  font-weight: bold;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left > :nth-child(2) {
    margin-left: 1.6rem;
  }

  .right {
    color: ${(props) => props.theme.color.brand};
  }

  .btn {
    cursor: pointer;
    padding: 0.5rem;
  }
`;

const Article = styled.article`
  flex: 1;
  overflow: scroll;

  padding: 1.6rem 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;
export default Pagefield;
