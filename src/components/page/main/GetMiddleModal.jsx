import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { Btn, InputDiv, Modal, PageTop } from "components/common";
import { DeleteIcon, LeftArrowIcon } from "assets/iconList";
import { SearchModal, ViewMiddleModal } from ".";
import { localAPI } from "apis";
import { sweetalert } from "utils";

const GetMiddleModal = (props) => {
  const { handleSubmit, register, setValue, unregister, reset } = useForm();
  const [inputIdList, setInputIdList] = useState([]);

  // 주소 검색 넘겨줄 상태
  const [searchToggle, setSearchToggle] = useState(false);
  const [target, setTarget] = useState("");

  // 결과보기 넘겨줄 상태
  const [locationList, setLocationList] = useState(null);
  const [resultToggle, setResultToggle] = useState(false);

  // 모달 열릴때 초기화
  useEffect(() => {
    if (props.toggle) {
      reset();
      setInputIdList([0, 1]);
    } else {
      unregister(`location`);
    }
  }, [props.toggle]);

  // input추가
  const addInputHandler = () => {
    if (inputIdList.length === 12) {
      const messge = "최대 12개의 장소입니다";
      sweetalert.failAlert(messge);
      return;
    }
    setInputIdList([...inputIdList, inputIdList[inputIdList.length - 1] + 1]);
  };

  // input 삭제
  const deleteInputHandler = (targetId) => {
    const deleteArr = inputIdList.filter((id) => id !== targetId);
    setInputIdList(deleteArr);
    unregister(`location.${targetId}`);
  };

  const searchModalOpen = (e) => {
    setTarget(e.target.name);
    setSearchToggle(!searchToggle);
  };

  // 최종 선택 주소 저장 함수
  const getMiddleLocation = async (data) => {
    let x = 0;
    let y = 0;
    let length = 0;
    let list = [];
    for (let address of data.location) {
      if (address) {
        const answer = await localAPI.coordTransfer(address);
        x += answer.x;
        y += answer.y;
        list.push({ x: answer.x, y: answer.y });
        length++;
      }
    }
    const answer = await localAPI.addressTransfer(x / length, y / length);
    setLocationList({ list, middleLocation: { address: answer.docs[0].address.address_name, coord: { x: x / length, y: y / length } } });
    setResultToggle(!resultToggle);
  };

  const registerOpt = { required: "주소를 입력해주세요" };
  return (
    <CustomModal toggle={props.toggle}>
      <PageTop>
        <div>
          <span
            className="icon"
            onClick={() => {
              props.setToggle(!props.toggle);
            }}
          >
            <LeftArrowIcon />
          </span>
          <span className="title">우리의 중간 장소 찾기</span>
        </div>
      </PageTop>

      <FormArea onSubmit={handleSubmit(getMiddleLocation)}>
        <InputArea>
          {inputIdList.map((id, i) => {
            return (
              <InputDiv key={`location.${id}`}>
                <input
                  readOnly
                  {...register(`location.${id}`, registerOpt)}
                  placeholder={`${i + 1}. 출발지를 입력해주세요`}
                  onClick={searchModalOpen}
                />
                {id > 1 ? (
                  <span className="icon" data-input-id={id} onClick={() => deleteInputHandler(id)}>
                    <DeleteIcon />
                  </span>
                ) : null}
              </InputDiv>
            );
          })}
        </InputArea>

        <AddBtn onClick={addInputHandler}>
          <span className="plus">+</span>
          <span>장소 추가</span>
        </AddBtn>
        <SubmitBtn>중간위치 찾기</SubmitBtn>
      </FormArea>

      <SearchModal toggle={searchToggle} setToggle={setSearchToggle} target={target} setValue={setValue} />
      <ViewMiddleModal locationList={locationList} toggle={resultToggle} setToggle={setResultToggle} />
    </CustomModal>
  );
};

export default memo(GetMiddleModal);

const CustomModal = styled(Modal)`
  display: flex;
  flex-flow: column;
`;

const FormArea = styled.form`
  flex: 1;
  overflow: scroll;

  padding: 0 ${(props) => props.theme.size.m};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const InputArea = styled.div`
  & > * {
    margin-bottom: calc(${(props) => props.theme.size.m} / 2);
  }
  .icon {
    cursor: pointer;
    fill: ${(props) => props.theme.color.disable};
  }
`;

const AddBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: ${(props) => props.theme.size.s};

  font-size: ${(props) => props.theme.size.s};
  font-weight: bold;
  color: ${(props) => props.theme.color.brand};

  .plus {
    padding: 0 calc(${(props) => props.theme.size.m} / 2);

    font-weight: normal;
    font-size: calc(${(props) => props.theme.size.s} * 2);
  }
`;

const SubmitBtn = styled(Btn)`
  margin: ${(props) => props.theme.size.s} 0;
`;
