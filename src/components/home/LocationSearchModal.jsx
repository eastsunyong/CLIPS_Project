import React from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";

import Modal from "components/common/Modal";

export const LocaionSearchModal = (props) => {
  const { handleSubmit, register, reset } = useForm();
  const registerOpt = {
    required: "검색어를 입력해주세요",
  };
  return (
    <Modal toggle={props.toggle}>
      <SearchArea className="fcc" onSubmit={handleSubmit((data) => console.log(data))}>
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
