import React, { useState } from "react";
import styled from "styled-components";

//React-Calendar
import Calendar from "react-calendar";
import "./ReactCalendar.css";

//moment
import moment from "moment";
import { useEffect } from "react";

const CustomCalendar = (props) => {
  //리액트 캘린더 날짜 받아오기
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    if (props.setSelectDate) {
      props.setSelectDate(value);
    }
  }, [value]);
  return (
    <Custom
      minDetail="month"
      calendarType="Hebrew"
      formatDay={(locale, date) => moment(date).format("D")}
      showNeighboringMonth={false}
      tileContent={(e) => {
        if (props.dateList) {
          if (props.dateList.find((x) => moment(new Date(x)).format("YYYY-MM-DD") === moment(e.date).format("YYYY-MM-DD"))) {
            return <Highlight />;
          }
        }
      }}
      onChange={onChange}
      value={value}
    />
  );
};

const Custom = styled(Calendar)`
  .react-calendar {
    border: none !important;
  }
  .react-calendar__tile--now {
    background: none;
  }
  .react-calendar__tile:disabled,
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus,
  .react-calendar__tile--hasActive,
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus,
  .react-calendar__tile--active,
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus,
  .react-calendar__tile--hover {
    background: none;
    abbr {
      display: block;
      width: 2.6rem;
      height: 2.6rem;
      line-height: 2.6rem;
      border-radius: 50%;
      background: ${(props) => props.theme.color.brand};
    }
  }
`;

const Highlight = styled.div`
  position: absolute;
  bottom: 0;

  width: 0.5rem;
  height: 0.5rem;

  border-radius: 50%;
  background-color: ${(props) => props.theme.color.brand};
`;

export default CustomCalendar;
