import React, { useState, useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import _ from "lodash";

import { Modal, PageField, TextField } from "components/common";
import { LeftArrow } from "assets/icons";
import defaultImg from "assets/img/UserDefaultImg.png";
import { promiseAPI } from "apis";
import { sweetalert } from "utils";
import { useXDrag } from "hooks";

const FindFriend = ({ toggle, selectTarget, setTargetData, friendList }) => {
  const { register, resetField } = useForm();
  const [list, setList] = useState([]);
  const [ref, start, end, moving] = useXDrag();

  useEffect(() => {
    if (toggle) {
      resetField("search");
      setList([]);
    }
  }, [toggle, resetField, setList]);

  // 검색 핸들러
  const searchHandler = async (e) => {
    const nickname = e.target.value;

    if (!nickname) {
      setList([]);
      return;
    }

    const answer = await promiseAPI.findFriend({ nickname });
    setList(answer.friend);
  };

  // 친구 선택 및 저장
  const selectNickname = (nickname) => {
    if (_.find(friendList, { nickname })) {
      const messge = "이미 등록되어있는 친구입니다.";
      sweetalert.timer(messge, "warning");
      return;
    }

    let friendStr = "";

    _.forEach(friendList, (v, i) => {
      friendStr += v.nickname + ", ";
      if (friendList.length - 1 === i) friendStr += nickname;
    });

    if (!friendList.length) friendStr += nickname;

    setTargetData(friendStr);
  };

  // 친구 삭제
  const deleteNickname = async (nickname) => {
    const answer = await sweetalert.confirm(`${nickname}을 제외하시겠습니까?`, "warning");

    if (answer.isConfirmed) {
      const deleteList = _.filter(friendList, (v) => v.nickname !== nickname);

      let friendStr = "";

      _.forEach(deleteList, (v, i) => {
        friendStr += v.nickname;
        if (deleteList.length - 1 !== i) friendStr += ", ";
      });

      setTargetData(friendStr);
    }
  };

  // register옵션
  const registerOpt = {
    onChange: _.debounce(searchHandler, 200),
  };

  return (
    <Modal toggle={toggle}>
      <PageField
        icon={
          <div className="btn" onClick={() => selectTarget(null)}>
            <LeftArrow className="md" />
          </div>
        }
        title="친구 찾기"
      >
        <Container>
          <TextField>
            <input autoComplete="off" placeholder="닉네임을 검색해주세요" {...register("search", registerOpt)} />
          </TextField>

          {friendList?.length ? (
            <AttendList>
              <div className="attendTitle">참석자</div>
              <div className="attendList" ref={ref} onMouseDown={start} onMouseMove={_.throttle(moving, 50)} onMouseUp={end} onMouseLeave={end}>
                {friendList &&
                  friendList.map((user) => {
                    return (
                      <div key={user.nickname} className="attend" onClick={() => deleteNickname(user.nickname)}>
                        {user.nickname}
                      </div>
                    );
                  })}
              </div>
            </AttendList>
          ) : null}

          <List>
            {list.map((user) => {
              return (
                <SearchResult
                  key={user.userId}
                  onClick={() => {
                    selectNickname(user.nickname);
                  }}
                >
                  <img src={user.img ? user.img : defaultImg} alt="유저 이미지" />
                  {user.nickname}
                </SearchResult>
              );
            })}
          </List>
        </Container>
      </PageField>
    </Modal>
  );
};

export default memo(FindFriend);

const Container = styled.div`
  display: flex;
  flex-flow: column;

  width: 100%;
  height: 100%;
`;

const AttendList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding-top: 1rem;

  font-size: 1.4rem;
  .attendTitle {
    min-width: max-content;
    font-weight: bold;
    margin-right: 1rem;
  }

  .attendList {
    flex: 1;
    overflow: scroll;

    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .attend {
    min-width: max-content;

    margin-right: 0.4rem;
    padding: 0.4rem 0.8rem;

    border: 0.1rem solid ${(props) => props.theme.color.black.light};
    border-radius: 2rem;
  }
`;

const List = styled.div`
  flex: 1;
  overflow: scroll;

  padding-top: 1rem;

  & > *:not(:last-child) {
    padding-bottom: 1.6rem;
  }
`;

const SearchResult = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: 1.6rem;
  font-weight: bold;

  img {
    width: 4.4rem;
    height: 4.4rem;
    margin-right: 1rem;

    border-radius: 1.2rem;
  }
`;
