import React, { useState, useEffect, memo } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import moment from "moment";

// 데이트 픽커 캘린더
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
// 데이트 픽커 한국어
import { ko } from "date-fns/esm/locale";

import { Btn, InputDiv, Modal, PageTop } from "components/common";
import { LeftArrowIcon } from "assets/icons";
import { promiseAPI } from "apis";
import { FindFriend } from ".";
import { resetState, setTemporaryStorage } from "store/modules/promiseSlice";

const AddPromise = (props) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: "" });

  const place = useSelector((state) => state.promise.place);
  const ts = useSelector((state) => state.promise.ts);

  // 친구 찾기 모달
  const [toggle, setToggle] = useState(false);
  // 데이트 픽커 날짜
  const today = new Date().toLocaleDateString("ko-KR");
  const [startDate, setStartDate] = useState(new Date(today));

  useEffect(() => {
    if (props.toggle) {
      reset();
      ts ? setStartDate(new Date(ts.date)) : setStartDate(new Date(today));
    }
  }, [props.toggle]);

  // 피커 날짜 바뀔때마다 시간 조정
  useEffect(() => {
    setValue("day", moment(startDate).format("YYYY.MM.DD"));
    setValue("time", moment(startDate).format("HH:mm"));
  }, [startDate]);

  // 뒤로가기 버튼
  const goBack = () => {
    if (ts || place) {
      const type = ts ? "정보" : "장소";
      const msg = `입력하신 ${type}가 초기화 됩니다.`;
      alert(msg);
      dispatch(resetState());
    }
    props.setToggle(false);
  };

  // 장소 선택 버튼
  const goMap = () => {
    if (!place) {
      const data = getValues();
      Object.keys(data).forEach((key) => {
        if (key === "day" || key === "time") delete data[key];
      });
      data.date = startDate.getTime();
      dispatch(setTemporaryStorage(data));
      nav("/");
    }
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
      x: place.coord.lat ? place.coord.lat : place.coord.x,
      y: place.coord.lng ? place.coord.lng : place.coord.y,
      date,
      friendList,
    };

    const answer = await promiseAPI.addList(sendData);
    if (answer.result) {
      alert(answer.msg);
      props.setToggle(false);
      reset();
      dispatch(resetState());
    }
  };

  return (
    <Modal toggle={props.toggle}>
      <PageTop>
        <div>
          <div className="icon" onClick={goBack}>
            <LeftArrowIcon />
          </div>
          <div className="title">약속 만들기</div>
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
              defaultValue={ts?.title ? ts?.title : ""}
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
              defaultValue={ts?.friendList ? ts?.friendList : ""}
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
          <p>약속 장소</p>
          <InputDiv>
            <input
              {...register("place", {
                required: "장소는 꼭 정해주세요",
              })}
              readOnly
              onClick={goMap}
              placeholder="약속장소를 선택해보세요"
              autoComplete="off"
              defaultValue={place?.address ? place?.address : ""}
            />
          </InputDiv>
        </div>

        <div className="inner largeInner">
          <p>메모</p>
          <InputDiv>
            <textarea {...register("penalty")} placeholder="메모를 작성해보세요 ex) 늦게오면 5만원" defaultValue={ts?.penalty ? ts?.penalty : ""} />
          </InputDiv>
        </div>
        <CustomBtn>저장하기</CustomBtn>
      </Section>

      <FindFriend toggle={toggle} setToggle={setToggle} friendList={getValues("friendList")} setValue={setValue} />
    </Modal>
  );
};

const Section = styled.form`
  display: flex;
  flex-flow: column;
  height: 100%;
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

export default memo(AddPromise);
