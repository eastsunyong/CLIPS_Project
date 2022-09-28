import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

// 데이트 픽커 캘린더
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
// 데이트 픽커 한국어
import { ko } from "date-fns/esm/locale";

import { FindFriend } from ".";
import { Btn, FormField, Modal, PageField, TextField } from "components/common";
import { LeftArrow } from "assets/icons";
import { resetAddData, setAddData, __addPromise } from "store/modules/promiseSlice";
import { useSearch } from "hooks";

const AddPromise = ({ addData, addToggle, setAddToggle }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const { register, handleSubmit, selectTarget, setTargetData, toggle, getValues, setValue, reset, errors } = useSearch();

  // 데이트 픽커 날짜
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    addData.date ? setStartDate(dayjs(addData.date)) : setStartDate(new Date());
  }, [addData.date, setStartDate]);

  // 피커 날짜 바뀔때마다 시간 조정
  useEffect(() => {
    setValue("day", dayjs(startDate).format("YYYY.MM.DD"));
    setValue("time", dayjs(startDate).format("HH:mm"));
  }, [startDate, setValue]);

  // 뒤로가기 버튼
  const goBack = () => {
    dispatch(resetAddData());
    setAddToggle(!addToggle);
    reset();
  };

  // 장소 선택 버튼 => 임시저장
  const goMap = () => {
    if (!addData.place.name) {
      const data = getValues();
      Object.keys(data).forEach((key) => {
        if (key === "day" || key === "time") delete data[key];
      });
      data.date = startDate.getTime();
      dispatch(setAddData(data));
      nav("/");
    }
  };

  // 문자열을 콜렉션으로 변환
  const string2arr = (friendList) => {
    let arr = [];
    if (!friendList) return arr;

    friendList.split(", ").forEach((nickname) => {
      arr.push({ nickname });
    });
    return arr;
  };

  // submit후 데이터 세팅
  const submitHandler = async (data) => {
    let friendList = string2arr(data.friendList);

    const date = data.day + " " + data.time;

    const sendData = {
      title: data.title,
      penalty: data.penalty,
      location: addData.place.name,
      x: addData.place.coord.x,
      y: addData.place.coord.y,
      date,
      friendList,
    };

    dispatch(__addPromise(sendData));
    setAddToggle(!addToggle);
    reset();
  };

  // 지난 시간 선택못하게
  const possibleTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <Modal toggle={addToggle}>
      <PageField
        icon={
          <div className="btn" onClick={goBack}>
            <LeftArrow className="md" />
          </div>
        }
        title="약속 만들기"
      >
        <FormField onSubmit={handleSubmit(submitHandler)}>
          <div className="inputArea">
            <div>
              <p className="titie">약속 이름</p>
              <TextField bdColor={!!errors.title?.message}>
                <input
                  autoComplete="off"
                  placeholder="이름을 작성해보세요"
                  {...register("title", {
                    required: "약속 이름은 꼭 정해주세요",
                    maxLength: { value: 30, message: "30자 이하로 정해주세요" },
                  })}
                  defaultValue={addData.title ? addData.title : ""}
                />
              </TextField>
              <p className="error">{errors.title?.message}</p>
            </div>

            <div>
              <p className="titie">참석자</p>
              <TextField>
                <input
                  autoComplete="off"
                  placeholder="홍길동, 우영우"
                  {...register("friendList")}
                  onClick={() => {
                    selectTarget("friendList");
                  }}
                  readOnly
                  defaultValue={addData.friendList ? addData.friendList : ""}
                />
              </TextField>
            </div>

            <div>
              <p className="titie">약속 날짜</p>
              <TextField>
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
              </TextField>
            </div>

            <div>
              <p className="titie">약속 시간</p>
              <TextField>
                <DatePicker
                  {...register("time")}
                  placeholderText="시간을 선택해주세요"
                  selected={startDate}
                  locale={ko}
                  onChange={setStartDate}
                  showPopperArrow={false}
                  timeIntervals={60}
                  dateFormat="HH:mm"
                  showTimeSelect
                  showTimeSelectOnly
                  autoComplete="off"
                  filterTime={possibleTime}
                />
              </TextField>
            </div>

            <div>
              <p className="titie">약속 장소</p>
              <TextField bdColor={!!errors.place?.message}>
                <input
                  autoComplete="off"
                  placeholder="약속장소를 선택해주세요"
                  readOnly
                  {...register("place", {
                    required: "장소는 꼭 정해주세요",
                  })}
                  onClick={goMap}
                  defaultValue={addData.place.name ? addData.place.name : ""}
                />
              </TextField>
              <p className="error">{errors.place?.message}</p>
            </div>

            <div>
              <p className="titie">메모</p>
              <TextField bdColor={!!errors.penalty?.message}>
                <textarea
                  autoComplete="off"
                  placeholder="메모를 작성해보세요 ex) 늦게오면 5만원"
                  {...register("penalty")}
                  defaultValue={addData.penalty ? addData.penalty : ""}
                />
              </TextField>
              <p className="error">{errors.penalty?.message}</p>
            </div>
          </div>

          <Btn>저장하기</Btn>
        </FormField>
      </PageField>

      <FindFriend toggle={toggle} selectTarget={selectTarget} setTargetData={setTargetData} friendList={string2arr(getValues("friendList"))} />
    </Modal>
  );
};

export default memo(AddPromise);
