import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { MdDeleteForever } from "react-icons/md";

import { BntArea, Btn, Title, Container, LocaionSearchModal } from "./HomeCommonStyle";

// 1. 유효성검증
// 2. 버튼 만들고 누를때마다 input 하나더 생성
// 3. 친구 주소 늘어날때 스크롤바 없애기 등 css 관련된거
// 4. 중간 장소 도출 시 어떻게 xy자표 구해서 어떻게 나눌 것인가? => 하나의 주소로 만들어야됨

const HomeOrderSecond = forwardRef((props, ref) => {
  const { handleSubmit, register, setValue, reset } = useForm();
  const [cnt, setCnt] = useState([0]);
  const [toggle, setToggle] = useState(false);

  const registerOpt = { required: "주소를 입력해주세요" };

  const deleteInput = (id) => {
    const deleteArr = cnt.filter((e) => e !== id);
    setCnt(deleteArr);
  };
  console.log("first");
  return (
    <Container className="fcc">
      {/* <LocaionSearchModal toggle={toggle} /> */}
      <FormArea
        className="fcc"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          ref.current.slickNext();
        })}
      >
        <Title>{props.type ? "장소 추천 받기" : "중간 장소 도출"}</Title>

        {/*location input 개수 */}
        {props.type ? null : <p>출발지 개수 : {cnt.length}</p>}

        <InputArea>
          {/*location input map */}
          {cnt.map((id, i) => {
            const miniTitle = props.type ? "도시" : "출발지";
            const placehloder = props.type ? "추천 받을 도시를 입력해주세요" : "주소를 입력해주세요";
            return (
              <div key={`location${id}`}>
                <p>
                  {i}.{miniTitle}
                </p>
                <input
                  {...register(`location${id}`, registerOpt)}
                  readOnly
                  placeholder={placehloder}
                  onFocus={() => {
                    setToggle(!toggle);
                  }}
                />
                {id > 0 ? (
                  <DeleteBtn data-input-id={id} onClick={() => deleteInput(id)}>
                    <MdDeleteForever />
                  </DeleteBtn>
                ) : null}
              </div>
            );
          })}
        </InputArea>

        {/*출발지 버튼 */}
        {props.type ? null : (
          <AddLocationBtn
            onClick={() => {
              setCnt([...cnt, cnt[cnt.length - 1] + 1]);
            }}
          >
            출발지 추가하기
          </AddLocationBtn>
        )}

        <BntArea>
          <CustomBtn>다음</CustomBtn>
          <CustomBtn
            onClick={(e) => {
              e.preventDefault();
              reset();
              setCnt([0]);
              ref.current.slickPrev();
            }}
          >
            뒤로가기
          </CustomBtn>
        </BntArea>
      </FormArea>
    </Container>
  );
});

const FormArea = styled.form`
  flex-flow: column;
  width: 100%;
  & > div:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const InputArea = styled.div`
  width: 80%;
  max-height: 30rem;
  flex-flow: column;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  div {
    position: relative;
    height: 10rem;
  }
  p {
    align-self: flex-start;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  input {
    width: 100%;
    padding: 1rem;
    font-size: 2rem;
  }
`;

const CustomBtn = styled(Btn)`
  width: 10rem;
  height: 5rem;

  font-size: 1.5rem;
`;

const AddLocationBtn = styled.span`
  padding: 1rem;
  font-size: 2rem;

  border-radius: 2.5rem;
  &:hover {
    background: rgb(255, 204, 204);
  }
`;

const DeleteBtn = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2rem;
  width: 2rem;
  height: 2rem;
`;

export default HomeOrderSecond;
