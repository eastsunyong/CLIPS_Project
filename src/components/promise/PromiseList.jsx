import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineLeft } from 'react-icons/ai';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiMoreVertical } from 'react-icons/fi';

//React-Calendar
import Calendar from "react-calendar";
import "./ReactCalendar.css"

//데이트 픽커 캘린더 
import DatePicker from "react-datepicker";
import { subDays, addDays } from 'date-fns';
// import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"

import { ko } from "date-fns/esm/locale";

import { OpacityModal } from "components/common/modal";
const PromiseList = (props) => {

    const navigater = useNavigate();

    //로그인 상태값 
    const [onLogin, setOnLogin] = useState(false);

    //리액트 캘린더 날짜 받아오기
    const [value, onChange] = useState(new Date());
    //데이트 픽커 날짜 받아오기
    const [startDate, setStartDate] = useState(new Date());

    const dates = startDate.toLocaleDateString('ko-kr')
    const times = startDate.toLocaleTimeString('ko-kr').slice(0, 7)

    console.log(dates, times)

    //약속리스트 맵 돌릴 useStat
    const [list, setList] = useState([
        {
            title: "약속이름입니당",
            date: "2022 09 07 19:28",
            location: "약속 장소",
            countFriend: 4
        },
        {
            title: "약속이름입니당111",
            date: "2022 09 07 19:28 2222",
            location: "약속 장소333",
            countFriend: 1
        }
    ])


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

    //약속 만드는 모달창 불러오기
    const [toggle, setToggle] = useState(false);

    return (
        <All>

            <Container className="fcc">
                <Header>
                    <h1>Calendar</h1>
                    <Icon><AiOutlinePlus
                        onClick={(e) => {
                            e.preventDefault();
                            setToggle(!toggle)
                        }} /></Icon>
                </Header>


                {/* 약속 만드는 모달창 */}
                <OpacityModal toggle={toggle}>
                    <AddPromise>
                        <p><AiOutlineLeft onClick={(e) => {
                            e.preventDefault();
                            setToggle(!toggle)
                        }} /></p>
                        <h2>약속 만들기</h2>
                    </AddPromise>
                    <InputBox>
                        <label>약속 이름</label>
                        <input
                            placeholder="이름을 작성해보세요"
                        />

                        <label>참석자</label>
                        <input onClick={(e) => {
                            e.preventDefault();
                            props.setPage(1)
                        }}
                            placeholder="홍길동, 우영우"
                        />

                        <label>약속 날짜</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            locale={ko}                   // 한글로 변경
                            dateFormat="yyyy.MM.dd" // 시간 포맷 변경
                            showPopperArrow={false}       // 화살표 변경
                            minDate={new Date()} dayClassName={date =>
                                 getDayName(createDate(date)) === '토' ? "saturday"
                                 :getDayName(createDate(date)) === '일' ? "sunday" : undefined
                                 }
                        />

                        <label>약속 시간</label>
                        <DatePicker
                            selected={startDate}
                            locale={ko}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="aa h:mm"
                            showTimeSelectOnly
                            showTimeInput
                        />
                        <label>메모</label>
                        <input style={{ height: "10rem" }} />
                    </InputBox>
                    <MakePromise>저장하기</MakePromise>
                </OpacityModal>
                {/* 약속 만드는 모달창 끝  */}

                <Calendar onChange={onChange} value={value} />

                {
                    onLogin ? <>{
                        list.map((a) => {
                            return (
                                <List>
                                    <ListHeader>
                                        <h2>{a.title}</h2>
                                        <p><FiMoreVertical /></p>
                                    </ListHeader>
                                    <div>
                                        <label>회원님 외 {a.countFriend}명</label>
                                    </div>
                                    <TimeLine>
                                        <h3>{a.date}</h3>
                                        <LocalArea>
                                            <h3><HiOutlineLocationMarker /></h3>
                                            <h3>{a.location}</h3>
                                        </LocalArea>
                                    </TimeLine>
                                </List>
                            )
                        })
                    }
                    </> : <NonLogin>
                        <NonLoginTitle>
                            <label>로그인하고</label>
                            <label>더 많은 기능을 만나보세요!</label>
                        </NonLoginTitle>
                        <button onClick={() => {
                            navigater('/login')
                        }}>
                            <p>로그인 / 회원가입</p></button>
                    </NonLogin>
                }
            </Container>

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

const Container = styled.div`
    width: 100%;
    max-width: 540px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
`

const Header = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px;
    h1{
        font-weight: 600;
    }
`
const Icon = styled.div`
    margin-top: 3px;
    font-size: 2.5rem;
    color:${(props) => props.theme.themeColor};
    cursor: pointer;
`

const AddPromise = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 5rem;
    align-items: center;
    font-weight: 700;
    padding-left: 1rem;
    gap: 20px;

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
    gap: 5px;
    margin-top: 3rem;

    input{
        border: 1px solid #4B556380;
        width: 100%;
        height: 37px;
        border-radius: 8px;
        padding-left: 8px;
    }
`

const MakePromise = styled.button`
    margin-top: 20px;
    width: 100%;
    height: 41px;
    border-radius: 8px;
    background-color:${(props) => props.theme.themeColor};
    border: none;
`


const List = styled.div`
    width: 98%;
    height: 103px;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    margin-top: 20px;
    box-shadow:0px 2px 8px rgba(75, 85, 99, 0.25);
    div{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px 16px;
    }


    p{
        font-size: 1.5rem;
        cursor: pointer;
    }

    label {
        color: gray;
    }
`

const ListHeader = styled.div`
    margin-top: 16px;
    margin-bottom: 4px;
    justify-content: space-between;
`


const TimeLine = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    color: gray;
    align-items: center;
    margin-top: 16px;
    h3 {
        font-size: 10px;
    }
`

const LocalArea = styled.div`
    gap: 5px;
`

const NonLogin = styled.div`
    width: 98%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    border: none;
    box-shadow: 0px 2px 8px rgba(75, 85, 99, 0.25);
    border-radius: 12px;
    margin-top: 5rem;
    padding-top: 16px;

    label {
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 5px;
    }

    button {
        width: 85%;
        height: 41px;
        border-radius: 8px;
        border: 1px solid ${(props) => props.theme.themeColor};
        background-color: white;
        margin-bottom: 18px;
        p {
            font-weight: 600;
            color: ${(props) => props.theme.themeColor};
        }
        :hover {
            background-color: ${(props) => props.theme.themeColor};
            p{
                color: white;
            }
        }
    }

`

const NonLoginTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export default PromiseList
