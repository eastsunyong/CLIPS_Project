import React, { forwardRef } from "react";
import styled from "styled-components";

import { Container, Title, BntArea, Btn } from "./HomeCommonStyle";

const HomeOrderFirst = forwardRef((props, ref) => {
  console.log("first");

  return (
    <Container className="fcc">
      <Title className="fcc">약속 장소 받기</Title>
      <BntArea className="fcc">
        <CustomBtn
          onClick={() => {
            props.setType(true);
            ref.current.slickNext();
          }}
        >
          장소 추천
        </CustomBtn>
        <CustomBtn
          onClick={() => {
            props.setType(false);
            ref.current.slickNext();
          }}
        >
          중간 장소
        </CustomBtn>
      </BntArea>
    </Container>
  );
});

const CustomBtn = styled(Btn)`
  width: 14rem;
  height: 7rem;

  font-size: 2rem;
`;

export default HomeOrderFirst;
