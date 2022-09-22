import React, { useState, useEffect, memo } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import moment from "moment";

// 데이트 픽커 캘린더
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
// 데이트 픽커 한국어
import { ko } from "date-fns/esm/locale";

import { Btn, InputDiv, OpacityModal, PageTop } from "components/common";
import { CloseIcon } from "assets/icons";
import { FindFriend } from ".";
import { promiseAPI } from "apis";
import { sweetalert } from "utils";

const ModifyPromise = (props) => {
  const promiseId = useParams().promiseId;
  const { register, handleSubmit, getValues, setValue, reset } = useForm();

  // 친구 찾기 모달
  const [toggle, setToggle] = useState(false);
  // 데이트 픽커 날짜
  const today = new Date().toLocaleDateString("ko-KR");
  const [startDate, setStartDate] = useState(new Date(today));

  // 피커 날짜 바뀔때마다 시간 조정
  useEffect(() => {
    setValue("day", moment(startDate).format("YYYY.MM.DD"));
    setValue("time", moment(startDate).format("HH:mm"));
  }, [startDate]);

  // 뒤로가기 버튼
  const goBack = () => {
    props.setToggle(false);
  };

  // submit후 데이터 세팅
  const submitHandler = async (data) => {
    const friendList = [];
    if (data.friendList) {
      data.friendList.split(", ").forEach((nickname) => {
        friendList.push({ nickname });
      });
    }

    const date = data.day + " " + data.time;

    let sendData = {
      title: data.title,
      penalty: data.penalty,
      location: props.item.location,
      x: props.item.x,
      y: props.item.y,
      date,
      friendList,
    };

    // 조금 수정필요
    // const answer = await promiseAPI.modifyPromise(promiseId, sendData);
    // if (answer.result) {
    //   const selected = await sweetalert.successAlert(answer.msg);

    //   if (selected.isConfirmed || selected.isDismissed) {
    //     props.setToggle(false);
    //     reset();
    //   }
    // }
  };

  let freindListString = "";
  if (props.item) {
    props.item?.friendList.forEach((friend, i, source) => {
      freindListString += friend.name;
      if (i !== source.length - 1) freindListString += ", ";
    });
  }

  useEffect(() => {
    if (props.toggle) {
      reset();
      setStartDate(new Date(props.item.date));
    }
  }, [props.toggle]);

  return (
    <CustomModal toggle={props.toggle}>
      <PageTop>
        <div>
          <div className="icon" onClick={goBack}>
            <CloseIcon />
          </div>
          <div className="title">편집하기</div>
        </div>
      </PageTop>
      <Section onSubmit={handleSubmit(submitHandler)}>
        <div className="inner">
          <p>약속 이름</p>
          <InputDiv>
            <input
              {...register("title", {
                required: "약속 이름은 꼭 정해주세요",
                maxLength: { value: 30, message: "30자 이하로 정해주세요" },
              })}
              placeholder="이름을 작성해보세요"
              autoComplete="off"
              defaultValue={props.item?.title ? props.item?.title : ""}
            />
          </InputDiv>
        </div>

        <div className="inner">
          <p>참석자</p>
          <InputDiv>
            <input
              {...register("friendList")}
              onClick={() => {
                setToggle(true);
              }}
              readOnly
              placeholder="홍길동, 우영우"
              autoComplete="off"
              defaultValue={freindListString}
            />
          </InputDiv>
        </div>

        <div className="inner">
          <p>약속 날짜</p>
          <InputDiv>
            <DatePicker
              {...register("day")}
              placeholderText="날짜를 선택해주세요"
              selected={startDate}
              onChange={setStartDate}
              showPopperArrow={false}
              locale={ko} // 한글로 변경
              dateFormat="yyyy.MM.dd" // 시간 포맷 변경
              minDate={new Date()}
              autoComplete="off"
            />
          </InputDiv>
        </div>

        <div className="inner">
          <p>약속 시간</p>
          <InputDiv>
            <DatePicker
              {...register("time")}
              placeholderText="시간을 선택해주세요"
              selected={startDate}
              locale={ko}
              onChange={setStartDate}
              showPopperArrow={false}
              dateFormat="HH:mm"
              showTimeSelect
              showTimeSelectOnly
              autoComplete="off"
            />
          </InputDiv>
        </div>

        <div className="inner">
          <p>
            약속 장소 <span style={{ color: "red", fontSize: "1.2rem" }}>(변경 불가)</span>
          </p>
          <InputDiv>
            <input
              {...register("place", {
                required: "장소는 꼭 정해주세요",
              })}
              readOnly
              autoComplete="off"
              defaultValue={props.item?.location ? props.item?.location : ""}
            />
          </InputDiv>
        </div>

        <div className="inner largeInner">
          <p>메모</p>
          <InputDiv>
            <textarea
              {...register("penalty")}
              placeholder="메모를 작성해보세요 ex) 늦게오면 5만원"
              defaultValue={props.item?.penalty ? props.item?.penalty : ""}
            />
          </InputDiv>
        </div>
        <CustomBtn>저장하기</CustomBtn>
      </Section>

      <FindFriend toggle={toggle} setToggle={setToggle} friendList={getValues("friendList")} setValue={setValue} />
    </CustomModal>
  );
};

export default memo(ModifyPromise);

const CustomModal = styled(OpacityModal)`
  display: flex;
  flex-flow: column;
`;

const Section = styled.form`
  flex: 1;
  overflow: scroll;

  display: flex;
  flex-flow: column;

  &::-webkit-scrollbar {
    display: none;
  }

  padding: 0 ${(props) => props.theme.size.m};
  & > *:not(:last-child) {
    margin-bottom: calc(${(props) => props.theme.size.xs} * 2);
  }

  .inner p {
    font-size: ${(props) => props.theme.size.s};
    font-weight: bold;
    margin-bottom: calc(${(props) => props.theme.size.m} / 2);
  }
  .largeInner {
    flex: 0.7;
    div {
      height: 100%;
    }
  }
`;

const CustomBtn = styled(Btn)`
  margin: calc(${(props) => props.theme.size.xs} * 2) 0;
`;
