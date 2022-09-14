import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";

//데이트 픽커 캘린더 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"
//달력 한국어
import { ko } from "date-fns/esm/locale";

//아이콘
import { AiOutlinePlus, AiOutlineLeft } from 'react-icons/ai';

const DetailPromiseEdit = (props) => {

    //데이트 픽커 날짜 받아오기
    const [startDate, setStartDate] = useState(new Date());

    const {
        getValues,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    // 주말 색깔 변환 하는 함수 ?
    const createDate = (date) => {
        return new Date(new Date(date.getFullYear()
            , date.getMonth(), date.getDate(), 0, 0, 0));
    }

    const getDayName = (date) => {
        return date.toLocaleDateString('ko-KR', {
            weekday: 'long',
        }).substr(0, 1);
    }


    return (
        <All>
            <Header>
                <p><AiOutlineLeft onClick={()=> {props.setToggle(false)}}/></p>
                <h2>편집하기</h2>
            </Header>
            <form>

            <InputBox>
                <label>약속 이름</label>
                {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
                <input
                    {...register("title", {
                        required: "약속 이름은 꼭 정해주세요", maxLength: { value: 30, message: "30자 이하로 정해주세요" },
                    })}
                    placeholder="이름을 작성해보세요"
                    name="title"
                  
                />

                <label>참석자</label>
                <input onClick={(e) => {
                    e.preventDefault();

                }}
                    placeholder="홍길동, 우영우"
                    name="location"
                />

                <label>약속날짜</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    locale={ko}                   // 한글로 변경
                    dateFormat="yyyy.MM.dd" // 시간 포맷 변경
                    showPopperArrow={false}       // 화살표 변경
                    minDate={new Date()} dayClassName={date =>
                        getDayName(createDate(date)) === '토' ? "saturday"
                            : getDayName(createDate(date)) === '일' ? "sunday" : undefined
                    }
                />

                <label>약속시간</label>
                <DatePicker
                    selected={startDate}
                    locale={ko}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="aa h:mm"
                    showTimeSelectOnly
                    showTimeInput
                />

                <label>약속장소</label>
                <input
                    {...register("location", {
                        required: "약속 이름은 꼭 정해주세요", maxLength: { value: 30, message: "30자 이하로 정해주세요" },
                    })}
                    placeholder="이름을 작성해보세요"
                    name="location"
                />

                <label>메모</label>
                <textarea style={{ height: "10rem" }}
                    {...register("penalty", {
                        required: "약속 이름은 꼭 정해주세요", maxLength: { value: 30, message: "30자 이하로 정해주세요" },
                    })}

                    placeholder="이름을 작성해보세요"
                />
            <MakePromise>저장하기</MakePromise>
            </InputBox>
            </form>
        </All>
    )
}

const All = styled.div`
  position: relative;
  flex-flow: column;
  min-width: 100%;
  min-height: 100%;
  padding: 0 2rem 2rem 2rem;
  flex-direction: column;
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 5rem;
    align-items: center;
    font-weight: 700;
    gap: 20px;
    margin-bottom: 25px;

    p {
        font-size: 20px;
        cursor: pointer;
    }

    h2 {
        margin-bottom: 3px;
        font-size: 20px;
    }
`

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
   
    input{
        border: 1px solid #4B556380;
        width: 100%;
        height: 37px;
        border-radius: 8px;
        padding: 10px 16px;
        margin-bottom: 24px;
    }

    textarea {
        border: 1px solid #4B556380;
        width: 100%;
        height: 37px;
        border-radius: 8px;
        padding: 10px 16px;
        resize: none;
    }
    label {
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: bolder;
    }
`

const MakePromise = styled.button`
    margin-top: 20px;
    width: 100%;
    height: 41px;
    border-radius: 8px;
    background-color:${(props) => props.theme.themeColor};
    color: white;
    border: none;
`

export default DetailPromiseEdit