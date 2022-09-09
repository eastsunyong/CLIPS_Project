import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLeft } from 'react-icons/ai';

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

export default FindFriend