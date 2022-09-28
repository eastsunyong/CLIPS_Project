import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

// dayjs
import dayjs from "dayjs";

import { Calendar } from "components/calendar";
import { Card, DropDownMenu, PageField } from "components/common";
import { My, Plus, CalendarI, Location, Delete } from "assets/icons";
import { sweetalert } from "utils";
import { __deletePromise, __getPromise, __getPromiseList } from "store/modules/promiseSlice";

const PromiseList = ({ setAddToggle }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.promise.promiseList);
  const userId = useSelector((state) => state.login.userId);

  const [selectDate, setSelectDate] = useState(null);
  const [dateList, setDateList] = useState([]);

  const deleteHandler = async (promiseId) => {
    const result = await sweetalert.confirm("정말로 삭제하시겠습니까?");
    if (result.isConfirmed) {
      dispatch(__deletePromise(promiseId));
    }
  };

  // 마운트 시 리스트 호출
  useEffect(() => {
    dispatch(__getPromiseList());
  }, []);

  // 리스트 호출 후 캘린더에 전달
  useEffect(() => {
    if (list.length) {
      setDateList(_.map(list, "date"));
    }
  }, [list]);

  return (
    <>
      <PageField
        title="Calendar"
        right={
          <div className="btn" onClick={() => setAddToggle(true)}>
            <Plus className="md" />
          </div>
        }
      >
        <Container>
          <Calendar dateList={dateList} setSelectDate={setSelectDate} />

          <List>
            {list.map((promise) => {
              if (dayjs(selectDate).format("YYYY-MM-DD") === dayjs(promise.date).format("YYYY-MM-DD")) {
                return (
                  <Card
                    key={promise.promiseId}
                    onClick={() => {
                      dispatch(__getPromise(promise.promiseId));
                    }}
                  >
                    <div className="cardTitle">
                      {promise.title}

                      {promise?.userId === userId && (
                        <DropDownMenu>
                          <DeleteBtn
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteHandler(promise.promiseId);
                            }}
                          >
                            <Delete className="md" />
                          </DeleteBtn>
                        </DropDownMenu>
                      )}
                    </div>

                    <div>
                      <div className="contentIcon">
                        <My className="sm" />
                      </div>
                      {promise.countFriend !== 0 ? `회원님 외 ${promise.countFriend}명` : "자신과의 약속"}
                    </div>

                    <div>
                      <div className="contentIcon">
                        <CalendarI className="sm" />
                      </div>
                      {promise.date}
                    </div>

                    <div>
                      <div className="contentIcon">
                        <Location className="sm" />
                      </div>
                      {promise.location ? promise.location : "장소를 불러올 수 없습니다."}
                    </div>
                  </Card>
                );
              }
            })}
          </List>
        </Container>
      </PageField>
    </>
  );
};

export default PromiseList;

const Container = styled.div`
  display: flex;
  flex-flow: column;

  height: 100%;
`;

const List = styled.div`
  flex: 1;
  overflow: scroll;

  padding: 2rem 0.5rem 0.5rem 0.5rem;

  & > *:not(:last-child) {
    margin-bottom: 1.6rem;
  }
`;

const DeleteBtn = styled.div`
  color: ${(props) => props.theme.color.error.main};
`;
