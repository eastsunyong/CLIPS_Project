import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLeft } from 'react-icons/ai';

import { SearchIcon } from "assets/icons";

const FindFriend = (props) => {

  return (
    <All>
      <Header>
        <p><AiOutlineLeft onClick={(e) => {
          e.preventDefault();
          props.setPage(0)
        }} /></p>
        <h2>친구 찾기</h2>
      </Header>
      <InputBox>
        <input
        placeholder="찾을 친구의 닉네임을 입력해주세요"
        />
        <button>asdasdd</button>
      </InputBox>

      {/* 아마 맵돌릴거임 */}
      <SearchContent>
        <h1>친구이름 들어감</h1>
        <p>폰번호 들어감</p>
      </SearchContent>

      <SearchBar
          className="fcc"
        >
          <input placeholder="시/군/구로 검색" readOnly />
          <div>
            <SearchIcon />
          </div>
        </SearchBar>

    </All>
  )
}

const All = styled.div`
  position: relative;
  flex-flow: column;
  min-width: 100%;
  min-height: 100%;
  padding: 0 2rem 2rem 2rem;
  flex-direction: column;
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 5rem;
    align-items: center;
    font-weight: 700;
    gap: 20px;

    p {
        font-size: 20px;
        cursor: pointer;
    }

    h2 {
        margin-bottom: 3px;
        font-size: 20px;
    }
`

const InputBox = styled.div`
  display: flex;
  margin-bottom: 20px;

  input{
        border: 1px solid #4B556380;
        width: 100%;
        height: 37px;
        border-radius: 8px;
        padding-left: 8px;
    }

`

const SearchContent = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 62px;
  border-radius: 12px;
  padding: 5px;
`

const SearchBar = styled.div`
  cursor: pointer;
  padding: ${(props) => props.theme.size.s} calc(${(props) => props.theme.size.s} * 2);

  background: white;
  border-radius: ${(props) => props.theme.size.m};
  box-shadow: 0 0.2rem 1rem rgba(17, 24, 39, 0.15);

  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    cursor: inherit;
    border: none;
    outline: none;
    width: 100%;

    font-size: ${(props) => props.theme.fontSize.s};
    &::placeholder {
      color: ${(props) => props.theme.iconsColor.disable};
    }
  }

  div {
    margin-left: ${(props) => props.theme.size.s};
    fill: ${(props) => props.theme.iconsColor.disable};
  }
  `

export default FindFriend