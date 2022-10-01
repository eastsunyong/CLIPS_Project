import React, { useState } from "react";
import styled from "styled-components";

import { LeftArrow } from "assets/icons";
import { PageField } from "components/common";
import { useLocation } from "react-router-dom";

const Helper = () => {
  const [toggle, setToggle] = useState(false);
  const pathname = useLocation().pathname;

  return (
    <Section toggle={toggle}>
      <ToggleBtn
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        가이드
      </ToggleBtn>

      <PageField
        icon={
          <div
            className="btn"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <LeftArrow className="sm" />
          </div>
        }
        title="가이드"
      >
        <List>
          {pathname === "/" ? (
            <>
              <p>추천 장소 검색은 어떻게 하나요?</p>
              <p>지도 버튼 사용법</p>
              <p>중간 장소 찾기 사용법</p>
            </>
          ) : (
            <>
              <p>약속 잡기</p>
              <p>달력 사용법</p>
            </>
          )}
        </List>
      </PageField>
    </Section>
  );
};

export default Helper;

const Section = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  left: ${(props) => (props.toggle ? "0%" : "-100%")};
  transition-duration: 0.7s;

  width: 100%;
  height: 100%;
  background: white;
`;

const ToggleBtn = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  right: -2.2rem;

  width: 2.2rem;
  height: max-content;
  margin: auto;
  padding: 0.5rem;

  background: ${(props) => props.theme.color.disable};
  border-radius: 0 1rem 1rem 0;

  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => props.theme.color.black.light};
  line-height: 1.2;
`;

const List = styled.div`
  display: flex;
  flex-flow: column;

  font-size: 1.4rem;
  line-height: 1.5;
`;
