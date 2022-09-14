import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { MdDeleteForever } from "react-icons/md";

import { BntArea, Btn, Title, Container } from "./HomeCommonStyle";
import LocaionSearchModal from "./home/LocationSearchModal";
import { localAPI } from "apis";

const HomeOrderSecond = (props) => {
  const { handleSubmit, register, setValue, reset, unregister } = useForm();
  const [idList, setIdList] = useState([0]);
  const [toggle, setToggle] = useState(false);
  const [target, setTarget] = useState(null);

  const registerOpt = { required: "주소를 입력해주세요" };

  // input 삭제 클릭 핸들러
  const deleteInput = (id) => {
    const deleteArr = idList.filter((e) => e !== id);
    unregister(`location.${id}`);
    setIdList(deleteArr);
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
    props.type ? setIdList([0]) : setIdList([0, 1]);
    unregister("location");
  }, [props.type]);

  // 최종 선택 주소 저장 함수
  const getResultLocation = async (data) => {
    let resultLocation = data.city === "" ? null : data.city;
    if (!resultLocation) {
      let x = 0;
      let y = 0;
      let length = 0;
      for (let address of data.location) {
        if (address) {
          const answer = await localAPI.coordTransfer(address);
          x += answer.x;
          y += answer.y;
          length++;
        }
      }
      const middleAddress = await localAPI.addressTransfer(x / length, y / length);
      resultLocation = middleAddress.docs[0].address.address_name;
    }
    props.setSelected(resultLocation);
    reset();
    props.setPage(2);
  };

  return (
    <Container className="fcc">
      <LocaionSearchModal toggle={toggle} setToggle={setToggle} target={target} setValue={setValue} />
      <FormArea className="fcc" onSubmit={handleSubmit(getResultLocation)}>
        <Title>{props.type ? "장소 추천 받기" : "중간 장소 도출"}</Title>

        {/*location input 개수 */}
        {props.type ? null : <p>출발지 개수 : {idList.length}</p>}

        <InputArea>
          {/*location input map */}
          {idList.map((id, i) => {
            const miniTitle = props.type ? "도시" : `${i + 1}. 출발지`;
            const placehloder = props.type ? "추천 받을 지역을 입력해주세요" : "주소를 입력해주세요";
            const resgisterName = props.type ? "city" : `location.${id}`;
            return (
              <div key={`location${id}`}>
                <p>{miniTitle}</p>
                <input {...register(resgisterName, registerOpt)} readOnly placeholder={placehloder} onClick={modalOpen} />
                {id > 1 ? (
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
                setIdList([...idList, idList[idList.length - 1] + 1]);
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
