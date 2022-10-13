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

const FindFriend = ({ toggle, setToggle, friendList, setFriendList }) => {
  const { register, resetField, setFocus } = useForm();
  const [list, setList] = useState([]);
  const [ref, start, end, moving] = useXDrag();

  useEffect(() => {
    if (toggle) {
      setList([]);
      resetField("search");
      // setFocus("search");
    }
  }, [toggle, resetField, setList, setFocus]);

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
  const selectNickname = (user) => {
    if (_.find(friendList, { userId: user.userId })) {
      const messge = "이미 등록되어있는 친구입니다.";
      sweetalert.timer(messge, "warning");
      return;
    }
    setFriendList([...friendList, user]);
  };

  // 친구 삭제
  const deleteNickname = async (user) => {
    const answer = await sweetalert.confirm(`${user.nickname}을 제외하시겠습니까?`, "warning");

    if (answer.isConfirmed) {
      setFriendList(_.filter(friendList, (v) => v.userId !== user.userId));
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
          <div className="btn" onClick={() => setToggle(null)}>
            <LeftArrow className="md" />
          </div>
        }
        title="닉네임 찾기"
      >
        <Container>
          <TextField>
            <input autoComplete="off" placeholder="닉네임을 입력해주세요" {...register("search", registerOpt)} />
          </TextField>

          <AttendList>
            <div className="attendTitle">참석자</div>
            {friendList.length !== 0 ? (
              <div className="attendList" ref={ref} onMouseDown={start} onMouseMove={_.throttle(moving, 50)} onMouseUp={end} onMouseLeave={end}>
                {friendList.map((user) => {
                  return (
                    <div key={user.userId} className="attend" onClick={() => deleteNickname(user)}>
                      {user.nickname}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="example">참석자가 없어요!</div>
            )}
          </AttendList>

          <List>
            {list.map((user) => {
              return (
                <SearchResult
                  key={user.userId}
                  onClick={() => {
                    selectNickname({ nickname: user.nickname, userId: user.userId });
                  }}
                >
                  <img src={user.image ? user.image : defaultImg} alt="유저 이미지" />
                  <span>{user.nickname}</span>
                  <span className="id">#{user.userId}</span>
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
    cursor: pointer;
    min-width: max-content;

    margin-right: 0.4rem;
    padding: 0.4rem 0.8rem;

    border: 0.1rem solid ${(props) => props.theme.color.black.light};
    border-radius: 2rem;
  }

  .example {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 2.4rem;

    font-size: 1.2rem;
    color: ${(props) => props.theme.color.black.light};
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
  cursor: pointer;

  font-size: 1.6rem;
  font-weight: bold;

  img {
    width: 4.4rem;
    height: 4.4rem;
    margin-right: 1rem;

    border-radius: 50%;
  }

  .id {
    margin-left: 0.5rem;
    font-size: 1.2rem;
    color: ${(props) => props.theme.color.black.light};
  }
`;
