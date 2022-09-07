import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { MoveLeftModal } from "components/common/modal";
import { ModalTop, ModalMain, BackBtn, BottomBtn } from "./common";
import { LocationSearchModal } from ".";
import { localAPI } from "apis";
import { number2kr } from "utils";
import { setAddress, toggleViewMiddle } from "store/modules/homeSlice";

const GetMiddleModal = () => {
  const dispatch = useDispatch();
  const viewMiddle = useSelector((state) => state.home.viewMiddle);
  const { handleSubmit, register, setValue, reset, unregister } = useForm();
  const [idList, setIdList] = useState([1, 2]);
  const [toggle, setToggle] = useState(false);
  const [target, setTarget] = useState(null);

  const registerOpt = { required: "주소를 입력해주세요" };

  // input 삭제 클릭 핸들러
  const deleteInput = (id) => {
    const deleteArr = idList.filter((e) => e !== id);
    setIdList(deleteArr);
    unregister(`location.${id}`);
  };

  // 모달 띄우기 클릭 핸들러
  const modalOpen = (e) => {
    const name = e.target.name;
    setTarget(name);
    setToggle(true);
  };

  // 모달 닫기 클릭 핸들러
  const modalClose = () => {
    reset();
    setIdList([1, 2]);
    unregister(`location`);
    dispatch(toggleViewMiddle());
  };

  // 최종 선택 주소 저장 함수
  const getResultLocation = async (data) => {
    let resultLocation = "";
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
    dispatch(setAddress(resultLocation));
    reset();
    setIdList([1, 2]);
    unregister(`location`);
    modalClose();
  };

  return (
    <MoveLeftModal toggle={viewMiddle}>
      <ModalTop className="fcc">
        <BackBtn onClick={modalClose}>
          <IoIosArrowBack />
        </BackBtn>
        <p>우리의 중간 장소 찾기</p>
      </ModalTop>
      <ModalMain className="fcc" onSubmit={handleSubmit(getResultLocation)}>
        <InputArea>
          {idList.map((id, i) => {
            const placehloder = `${number2kr(i + 1)}번째 장소`;
            const resgisterName = `location.${id}`;
            return (
              <div key={`location${id}`} className="fcc">
                <input readOnly {...register(resgisterName, registerOpt)} placeholder={placehloder} onClick={modalOpen} />
                {id > 2 ? (
                  <DeleteBtn className="fcc" data-input-id={id} onClick={() => deleteInput(id)}>
                    <MdDeleteForever />
                  </DeleteBtn>
                ) : null}
              </div>
            );
          })}
        </InputArea>
        <AddLocationBtn
          className="fcc"
          onClick={() => {
            if (idList.length === 12) {
              alert("최대 12개의 장소");
              return;
            }
            setIdList([...idList, idList[idList.length - 1] + 1]);
          }}
        >
          <AiOutlinePlus />
          <span>장소 추가</span>
        </AddLocationBtn>
        <SubmitBtn type="submit" value="중간위치 찾기" />
      </ModalMain>
      <LocationSearchModal toggle={toggle} setToggle={setToggle} target={target} setValue={setValue} />
    </MoveLeftModal>
  );
};

export default GetMiddleModal;

const InputArea = styled.div`
  width: 100%;
  max-height: 80%;
  overflow: auto;
  margin: ${(props) => props.theme.size.s} 0;
  &::-webkit-scrollbar {
    display: none;
  }
  div {
    position: relative;
    border: 0.1rem solid gray;
    border-radius: ${(props) => props.theme.size.s};
    overflow: hidden;
  }
  div:not(:last-child) {
    margin-bottom: ${(props) => props.theme.size.s};
  }
`;

const AddLocationBtn = styled.div`
  cursor: pointer;
  margin: ${(props) => props.theme.size.s} 0 calc(${(props) => props.theme.size.s} * 2) 0;
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: bold;
  color: ${(props) => props.theme.themeColor};
  & > :first-child {
    margin-right: calc(${(props) => props.theme.size.s} / 2);
  }
`;

const DeleteBtn = styled.span`
  cursor: pointer;
  margin: 0 calc(${(props) => props.theme.fontSize.s} / 2);
  font-size: calc(${(props) => props.theme.fontSize.s} * 1.5);
`;

const SubmitBtn = styled(BottomBtn)`
  border-radius: ${(props) => props.theme.size.s};
  background: ${(props) => props.theme.themeColor};
  color: white;
  font-weight: bold;
`;
