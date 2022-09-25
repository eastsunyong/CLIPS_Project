import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//moment
import moment from "moment";

import { Card, DropDownMenu, PageTop, TextBox } from "components/common";
import { DeleteIcon, LocationIcon, PlusIcon } from "assets/iconList";
import { Calendar } from "components/calendar";
import { promiseAPI } from "apis";
import { jwt, sweetalert } from "utils";

const PromiseList = (props) => {
  const promise = useSelector((state) => state.promise);
  const nav = useNavigate();

  const [selectDate, setSelectDate] = useState(null);
  const [list, setList] = useState([]);
  const [dateList, setDateList] = useState([]);

  const getPromise = async () => {
    const answer = await promiseAPI.getList();

    const getDateList = [];
    for (let p of answer.list) {
      getDateList.push(p.date);
    }

    setDateList(getDateList);
    setList(answer.list);
  };

  const deleteHandler = async (promiseId) => {
    // const result = await sweetalert.confirm("정말로 삭제하시겠습니까?");
    // if (result.isConfirmed) {
    //   const answer = await promiseAPI.deletePromise(promiseId);
    //   if (answer.result) {
    //     sweetalert.successTimerAlert(answer.msg);
    //     getPromise();
    //   }
    // }
  };

  useEffect(() => {
    getPromise();
  }, [promise]);

  return (
    <Section>
      <CustomTop>
        <div className="title">Calendar</div>
        <div className="icon" onClick={() => props.setToggle(true)}>
          <PlusIcon />
        </div>
      </CustomTop>

      <Calendar dateList={dateList} setSelectDate={setSelectDate} />

      <CardList>
        {list.map((promise) => {
          if (moment(selectDate).format("YYYY-MM-DD") === moment(new Date(promise.date)).format("YYYY-MM-DD")) {
            return (
              <CustomCard key={promise.promiseId} onClick={() => nav(`/promise/${promise.promiseId}`)}>
                <TextBox>
                  <div>
                    <div className="title">{promise.title}</div>
                    <div>{promise.countFriend !== 0 ? `회원님 외 ${promise.countFriend}명` : "자신과의 약속"}</div>
                    <div className="info">
                      <span>{promise.date}</span>
                      <span>
                        <span className="pin">
                          <LocationIcon />
                        </span>
                        {promise.location ? promise.location : "장소를 불러올 수 없습니다."}
                      </span>
                    </div>
                  </div>
                </TextBox>

                {promise?.userId === jwt.getUserId() && (
                  <DropDownMenu>
                    <DeleteBtn
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHandler(promise.promiseId);
                      }}
                    >
                      <DeleteIcon />
                    </DeleteBtn>
                  </DropDownMenu>
                )}
              </CustomCard>
            );
          }
        })}
      </CardList>
    </Section>
  );
};

const Section = styled.section`
  position: relative;
  display: flex;
  flex-flow: column;

  height: 100%;
  & > *:not(:first-child) {
    padding: 0 ${(props) => props.theme.size.m};
  }
`;

const CustomTop = styled(PageTop)`
  .icon {
    fill: ${(props) => props.theme.color.brand};
  }
`;

const CardList = styled.div`
  flex: 1;
  overflow: scroll;

  padding-top: ${(props) => props.theme.size.xl} !important;
  &::-webkit-scrollbar {
    display: none;
  }
  & > * {
    margin-bottom: ${(props) => props.theme.size.m};
  }
`;

const CustomCard = styled(Card)`
  cursor: pointer;
  display: flex;
  .info {
    display: flex;
    align-items: center;
    margin-top: ${(props) => props.theme.size.m};
    & > :last-child {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: ${(props) => props.theme.size.m};
      .pin {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: calc(${(props) => props.theme.size.xs} / 2);
        fill: ${(props) => props.theme.color.disable};
      }
    }
  }
`;

const DeleteBtn = styled.li`
  fill: red;
`;

export default PromiseList;
