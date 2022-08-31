import React, { forwardRef } from "react";
import styled from "styled-components";

const HomeOrderFirst = forwardRef((props, ref) => {
  return (
    <Container>
      <p className="fcc">약속 장소 받기</p>
      <div className="fcc">
        <Btn
          onClick={() => {
            props.setType(true);
            ref.current.slickNext();
          }}
        >
          장소 추천
        </Btn>
        <Btn
          onClick={() => {
            props.setType(false);
            ref.current.slickNext();
          }}
        >
          중간 장소
        </Btn>
      </div>
    </Container>
  );
});

const Container = styled.div`
  p {
    font-size: 4rem;
    margin-bottom: 2rem;
  }
  button:first-child {
    margin-right: 1rem;
  }
`;

const Btn = styled.button`
  width: 14rem;
  height: 7rem;

  font-size: 2rem;
  font-weight: bold;
  color: white;

  background: rgb(255, 204, 204);
  border: 0.1rem solid rgb(255, 204, 204);
  border-radius: 2.5rem;

  &:hover {
    background: white;
    color: rgb(255, 204, 204);
  }
`;

export default HomeOrderFirst;
