import React from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";

import Modal from "components/common/Modal";
import { searchAddress } from "apis/localAPI";

export const LocaionSearchModal = (props) => {
  const { handleSubmit, register, reset } = useForm();
  const registerOpt = {
    required: "검색어를 입력해주세요",
  };

  const submitCallback = async (data) => {
    const answer = await searchAddress(data.search);
    if (answer.result) {
      props.setValue(props.target, data.search);
    }
  };

  return (
    <Modal toggle={props.toggle}>
      <SearchArea className="fcc" onSubmit={handleSubmit(submitCallback)}>
        <BackBtn
          className="fcc"
          onClick={() => {
            props.setToggle(!props.toggle);
          }}
        >
          <IoIosArrowBack />
        </BackBtn>
        <input {...register("search", registerOpt)} type="search" placeholder="주소를 입력해주세요" />
        <SearchBtn>검색</SearchBtn>
      </SearchArea>
    </Modal>
  );
};

const SearchArea = styled.form`
  box-shadow: 0 0.3rem 0.3rem -0.3rem;
  padding: 1rem;
  & > * {
    height: 5rem;
  }
  input {
    margin: 0 2rem;
    padding: 1rem;
    flex: 1;
    font-size: 2rem;
  }
`;

const BackBtn = styled.div`
  cursor: pointer;
  width: 5rem;
  font-size: 4rem;
`;

const SearchBtn = styled.button`
  width: 10rem;
  border-radius: 2.5rem;
`;
