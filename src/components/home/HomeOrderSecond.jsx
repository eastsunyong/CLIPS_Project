import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { MdDeleteForever } from "react-icons/md";

import { BntArea, Btn, Title, Container } from "./HomeCommonStyle";
import { LocaionSearchModal } from "./LocationSearchModal";
import { useEffect } from "react";
import { addressTransfer, searchAddress } from "apis/localAPI";

// 4. 중간 장소 도출 시 어떻게 xy자표 구해서 어떻게 나눌 것인가? => 하나의 주소로 만들어야됨

const HomeOrderSecond = (props) => {
  const { handleSubmit, register, setValue, reset } = useForm();
  const [cnt, setCnt] = useState([1]);
  const [toggle, setToggle] = useState(false);
  const [target, setTarget] = useState(null);

  const registerOpt = { required: "주소를 입력해주세요" };

  // input 삭제 클릭 핸들러
  const deleteInput = (id) => {
    const deleteArr = cnt.filter((e) => e !== id);
    setCnt(deleteArr);
  };

  // 뒤로가기 클릭 핸들러
  const goBack = (e) => {
    e.preventDefault();
    reset();
    props.setPage(0);
  };

  // 모달 띄우기 클릭 핸들러
  const modalOpen = (e) => {
    const name = e.target.name;
    setTarget(name);
    setToggle(true);
  };

  // 타입별 최초 인풋 개수 정하기
  useEffect(() => {
    props.type ? setCnt([1]) : setCnt([1, 2]);
  }, [props.type]);

  // 최종 선택 주소 저장 함수
  const getResultLocation = async (data) => {
    console.log(data);
    // let resultLocation = data.city === "" ? null : data.city;
    // if (!resultLocation) {
    //   let x = 0;
    //   let y = 0;
    //   let length = 0;
    //   for (let key in data) {
    //     if (key !== "city") {
    //       const answer = await searchAddress(data[key]);
    //       const doc = answer.docs[0];
    //       const addressInfo = doc.address ? doc.address : doc.road_address;
    //       x += Number(addressInfo.x);
    //       y += Number(addressInfo.y);
    //       length++;
    //     }
    //   }
    //   const middleAddress = await addressTransfer(x / length, y / length);
    //   resultLocation = middleAddress.docs[0].address.address_name;
    // }
    // console.log(resultLocation);
  };

  return (
    <Container className="fcc">
      <LocaionSearchModal toggle={toggle} setToggle={setToggle} target={target} setValue={setValue} />
      <FormArea className="fcc" onSubmit={handleSubmit(getResultLocation)}>
        <Title>{props.type ? "장소 추천 받기" : "중간 장소 도출"}</Title>

        {/*location input 개수 */}
        {props.type ? null : <p>출발지 개수 : {cnt.length}</p>}

        <InputArea>
          {/*location input map */}
          {cnt.map((id, i) => {
            const miniTitle = props.type ? "도시" : `${i + 1}. 출발지`;
            const placehloder = props.type ? "추천 받을 지역을 입력해주세요" : "주소를 입력해주세요";
            const resgisterName = props.type ? `city` : `location${id}`;
            return (
              <div key={`location${id}`}>
                <p>{miniTitle}</p>
                <input {...register(resgisterName, registerOpt)} readOnly placeholder={placehloder} onClick={modalOpen} />
                {id > 2 ? (
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
          <div>
            <AddLocationBtn
              onClick={() => {
                setCnt([...cnt, cnt[cnt.length - 1] + 1]);
              }}
            >
              출발지 추가하기
            </AddLocationBtn>
          </div>
        )}

        <BntArea>
          <CustomBtn>다음</CustomBtn>
          <CustomBtn onClick={goBack}>뒤로가기</CustomBtn>
        </BntArea>
      </FormArea>
    </Container>
  );
};

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
  cursor: pointer;
  font-size: 2rem;

  border-radius: 2.5rem;
  &:hover {
    background: rgb(255, 204, 204);
  }
`;

const DeleteBtn = styled.span`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2rem;
  width: 2rem;
  height: 2rem;
`;

export default HomeOrderSecond;
