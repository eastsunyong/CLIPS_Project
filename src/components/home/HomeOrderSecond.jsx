import React, { forwardRef } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

// 1. 유효성검증
// 2. 버튼 만들고 누를때마다 input 하나더 생성
// 3. 친구 주소 늘어날때 스크롤바 없애기 등 css 관련된거
// 4. 중간 장소 도출 시 어떻게 xy자표 구해서 어떻게 나눌 것인가? => 하나의 주소로 만들어야됨

const HomeOrderSecond = forwardRef((props, ref) => {
  const { handleSubmit, register } = useForm();
  return (
    <Container className="fcc">
      <Title>{props.type ? "장소 추천 받기" : "중간 장소 도출"}</Title>
      <LocationInputArea
        onSubmit={handleSubmit((data) => {
          ref.current.slickNext();
        })}
      >
        <p>{props.type ? "도시" : "내 주소"}</p>
        <input placeholder={props.type ? "추천 받을 도시" : "주소"} {...register("city")} />
        <div className="fcc">
          <Btn
            onClick={(e) => {
              e.preventDefault();
              ref.current.slickPrev();
            }}
          >
            뒤로가기
          </Btn>
          <Btn>다음</Btn>
        </div>
      </LocationInputArea>
    </Container>
  );
});

const Container = styled.div`
  flex-flow: column;
`;

const Title = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

const LocationInputArea = styled.form`
  p {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  input {
    width: 30rem;
    padding: 1rem;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .fcc {
    & > :first-child {
      margin-right: 1rem;
    }
  }
`;

const Btn = styled.button`
  width: 10rem;
  height: 5rem;

  font-size: 1.5rem;
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

export default HomeOrderSecond;
