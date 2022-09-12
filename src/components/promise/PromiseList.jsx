import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

//아이콘
import { AiOutlinePlus, AiOutlineLeft } from 'react-icons/ai';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiMoreVertical } from 'react-icons/fi';

//React-Calendar
import Calendar from "react-calendar";
import "./ReactCalendar.css"

//데이트 픽커 캘린더 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css"
//달력 한국어
import { ko } from "date-fns/esm/locale";

import { OpacityModal } from "components/common/modal";

const PromiseList = (props) => {

    const navigater = useNavigate();

    //약속 만드는 모달창 불러오기
    const [toggle, setToggle] = useState(false);

    //로그인 상태값 
    const [onLogin, setOnLogin] = useState(true);

    //리액트 캘린더 날짜 받아오기
    const [value, onChange] = useState(new Date());

    //데이트 픽커 날짜 받아오기
    const [startDate, setStartDate] = useState(new Date());

    //날짜 값들 변환해서 저장하는 곳
    const dates = startDate.toLocaleDateString('ko-kr')
    const times = startDate.toLocaleTimeString('ko-kr').slice(0, 7)
    //문자열로 바꾼거임

    //변환힌 날짜 값 합쳐서 저장하는 곳
    const newDay = dates + times

    const [list, setList] =useState({})

    useEffect(() => {
        const getPromise = async () => {
          try {
            const axiosData = await axios.get(process.env.REACT_APP_SURVER + '/api/promise?done=true/false') 
            const result = axiosData.data
            console.log(result)
            setList(result)
          } catch (err) {
            console.log(err);
          }
        };
        getPromise();
      }, []) 

    //약속리스트 맵 돌릴 useStat
    const [qwe, setQwe] = useState([
        {
            title: "약속이름입니당",
            date: "2022. 09. 08.오후 1:35",
            location: "약속 장소",
            countFriend: 4,
            PromiseId: 1
        },
        {
            title: "약속이름입니당111",
            date: "2022. 09. 07.오후 1:12",
            location: "약속 장소333",
            countFriend: 1,
            PromiseId: 2
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

    const {
        getValues,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    //오류 메세지 확인
    const onValid = (data) => console.log(data, "onvalid");
    const onInvalid = (data) => console.log(data, "onInvalid");

    console.log(newDay)

    //약속만드는 함수
    const onSubmit = async (data) => {
        await axios.post('/api/promise', {title: data.title, date: newDay, penalty: data.penalty, location: data.location, friendList: data.friendList})
    };

    //약속만드는 핸들러
    // const LogInHandler = async (newPromise) => {
    //     await axios.post('/api/promise', newPromise)
    // }

    const test = ["2022. 9. 8.", "2022. 9. 7."]

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AddPromise>
                            <p><AiOutlineLeft onClick={(e) => {
                                e.preventDefault();
                                setToggle(!toggle)
                            }} /></p>
                            <h2>약속 만들기</h2>
                        </AddPromise>
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
                                props.setPage(1)
                            }}
                            {...register("friendList", {
                                required: "찬구들을 적어주세요", maxLength: { value: 30, message: "30자 이하로 정해주세요" },
                            })}
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
                        </InputBox>
                        <MakePromise>저장하기</MakePromise>
                    </form>
                </OpacityModal>
                {/* 약속 만드는 모달창 끝  */}

                <Calendar
                    tileContent={(e) => {
                        // console.log(new Date(test[0]).getTime())
                        // console.log((e.date.getTime()))
                        // 밀리세컨즈로 비교하는 방식

                        if (test.find((x) => new Date(x).getTime() === e.date.getTime())) {
                            // console.log(e.date.getTime() / 100000)
                            return <Highlight />
                        }
                        //스트링으로 검색하는 방법
                        // if(test.find((x) => {
                        //     // console.log(x)
                        //     // console.log(e.date.toLocaleDateString("ko-KR"))
                        //     return x === e.date.toLocaleDateString("ko-KR")})) {
                        //     console.log(e.date)
                        // }
                        // console.log(e.date.toLocaleDateString("ko-KR"))
                    }}

                    onChange={onChange} value={value}
                />

                {
                    onLogin ? <>{
                        qwe.map((a) => {
                            return (
                                <List key={a.PromiseId} onClick={() => {navigater(`/promise/${a.PromiseId}`)}}>
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

const Highlight = styled.div`
    width: 6px;
    height: 6px;
    background:black;
    border-radius: 50%;
    display: flex;
    background-color: red;
    margin-left: 12px;
`

export default PromiseList
