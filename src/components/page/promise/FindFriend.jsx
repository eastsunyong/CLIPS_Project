import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { InputDiv, Modal, PageTop } from "components/common";
import { LeftArrowIcon, SearchIcon } from "assets/icons";
import { promiseAPI } from "apis";
import defaultImg from "assets/img/UserDefaultImg.png";

const FindFriend = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (props.toggle) {
      reset();
      setList([]);
    }
  }, [props.toggle]);

  const submitHandler = async (data) => {
    if (props.friendList && props.friendList.includes(data.nickname)) {
      alert("이미 등록되어있는 친구입니다.");
      return;
    }
    const answer = await promiseAPI.findFriend(data);
    answer.result ? setList([answer.friend]) : setList([]);
    if (!answer.result) alert(answer.msg);
  };

  const selectNickname = (nickname) => {
    const friendList = props.friendList ? `${props.friendList}, ${nickname}` : nickname;
    props.setValue("friendList", friendList);
    props.setToggle(false);
  };

  return (
    <CustomModal toggle={props.toggle}>
      <PageTop>
        <div>
          <div
            className="icon"
            onClick={() => {
              props.setToggle(false);
            }}
          >
            <LeftArrowIcon />
          </div>
          <div className="title">친구 찾기</div>
        </div>
      </PageTop>
      <form onSubmit={handleSubmit(submitHandler)}>
        <CustomInputDiv>
          <input {...register("nickname", { required: "닉네임을 입력해주세요" })} placeholder="친구의 닉네임을 입력해주세요" autoComplete="off" />
          <span className="icon">
            <SearchIcon />
          </span>
        </CustomInputDiv>
      </form>
      <List>
        {list.map((person) => {
          return (
            <div key={person.userId} onClick={() => selectNickname(person.nickname)}>
              <img src={person.img ? person.img : defaultImg} alt="유저이미지" />
              <div className="text">{person.nickname}</div>
            </div>
          );
        })}
      </List>
    </CustomModal>
  );
};

export default FindFriend;

const CustomModal = styled(Modal)`
  display: flex;
  flex-flow: column;
  & > *:not(:first-child) {
    padding: 0 ${(props) => props.theme.size.m};
  }
  form {
    margin-bottom: calc(${(props) => props.theme.size.xs} * 2);
  }
`;

const CustomInputDiv = styled(InputDiv)`
  .icon {
    fill: ${(props) => props.theme.color.disable};
  }
`;

const List = styled.div`
  flex: 1;
  & > * {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    padding-bottom: ${(props) => props.theme.size.m};
  }
  img {
    width: 4.4rem;
    height: 4.4rem;
  }
  .text {
    margin-left: ${(props) => props.theme.size.m};
    font-size: ${(props) => props.theme.size.m};
    font-weight: bold;
  }
`;
