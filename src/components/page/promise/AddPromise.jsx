import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import _ from "lodash";

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

const AddPromise = ({ addData, addToggle, setAddToggle }) => {
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
  const [friendList, setFriendList] = useState([]);

  // 데이트 픽커 날짜
  const [startDate, setStartDate] = useState(new Date());
  const [friendToggle, setFriendToggle] = useState(false);

  // 임시저장 데이터 기입
  useEffect(() => {
    addData.date ? setStartDate(dayjs(addData.date).toDate()) : setStartDate(new Date());
    if (addData.friendList) {
      setFriendList(addData.friendList);
    }
  }, [addData.date, setStartDate, addData.friendList, setFriendList]);

  // 친구목록 변환시 input에 보여주는 value 변경
  useEffect(() => {
    if (friendList.length > 0) {
      let friendStr = "";

      _.forEach(friendList, (v, i) => {
        friendStr += v.nickname;
        if (friendList.length - 1 !== i) friendStr += ", ";
      });
      setValue("friendList", friendStr);
    } else {
      setValue("friendList", "");
    }
  }, [friendList, setValue]);

  // 피커 날짜 바뀔때마다 시간 조정
  useEffect(() => {
    setValue("day", dayjs(startDate).format("YYYY.MM.DD"));
    setValue("time", dayjs(startDate).format("HH:mm"));
  }, [startDate, setValue]);

  // 뒤로가기 버튼
  const goBack = () => {
    dispatch(resetAddData());
    setStartDate(new Date());
    setFriendList([]);
    setAddToggle(!addToggle);
    reset();
  };

  // 장소 선택 버튼 => 임시저장
  const goMap = () => {
    if (!addData.place.name) {
      const data = getValues();
      Object.keys(data).forEach((key) => {
        if (key === "day" || key === "time" || key === "friendList") delete data[key];
      });
      data.date = startDate.getTime();
      data.friendList = friendList;
      dispatch(setAddData(data));
      nav("/");
    }
  };

  // submit후 데이터 세팅
  const submitHandler = async (data) => {
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
                  placeholder="약속을 같이 할 친구를 입력해주세요"
                  {...register("friendList")}
                  readOnly
                  onClick={() => {
                    setFriendToggle(!friendToggle);
                  }}
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
                  placeholder="메모를 작성해보세요 ex) 늦게 오면 5만원"
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

      <FindFriend toggle={friendToggle} setToggle={setFriendToggle} friendList={friendList} setFriendList={setFriendList} />
    </Modal>
  );
};

export default memo(AddPromise);
