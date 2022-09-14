import React from "react";
import styled from "styled-components";
import { useState } from "react";

//아이콘
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { MoveLeftModal } from "components/common/modal";
import { SignUpPage3 } from "components/login";

const SignUpPage2 = (props) => {

    const [toggle, setToggle] =useState(false)

    const privacySelect = [
        { id: 0, title: '이용약관 동의 (필수)' },
        { id: 1, title: '개인정보의 제 3자 제공 동의 (필수)' },
    ];

    // 체크된 아이템을 담을 배열
    const [checkItems, setCheckItems] = useState([]);

    // 체크박스 단일 선택
    const handleSingleCheck = (checked, id) => {
        if (checked) {
            // 단일 선택 시 체크된 아이템을 배열에 추가
            setCheckItems(prev => [...prev, id]);
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if (checked) {
            // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
            const idArray = [];
            privacySelect.forEach((el) => idArray.push(el.id));
            setCheckItems(idArray);
        }
        else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckItems([]);
        }
    }

    return (
        <All>
            <Header>
                <p><AiOutlineLeft onClick={() => { props.setToggle(false) }} /></p>
                <h2>회원가입</h2>
            </Header>
            <Textlocal>
                <h1>서비스 이용약관에 동의해주세요</h1>
            </Textlocal>

            <SelectBox>
                <AllSelcet>
                    <input type='checkbox'
                        onChange={(e) => handleAllCheck(e.target.checked)}
                        // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                        checked={checkItems.length === privacySelect.length ? true : false} />
                    <p>전체 동의합니다.</p>

                </AllSelcet>
                <OtherSelect>
                    {privacySelect?.map((data, key) => (
                        <RightGo key={key}>
                            <div>
                            <input type='checkbox'
                                onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
                                // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                checked={checkItems.includes(data.id) ? 'unable' : ""} />
                                <p>{data.title}</p>
                            </div>
                            <div>
                                <h4><AiOutlineRight/></h4>
                            </div>
                        </RightGo>
                    ))}
                </OtherSelect>
            </SelectBox>
            {
            checkItems.length === privacySelect.length ?  <Onbutton onClick={()=>{setToggle(true)}}>다음</Onbutton>: <NonButton>다음</NonButton>
            }

            <MoveLeftModal toggle={toggle}>
                <SignUpPage3 setToggle={setToggle}/>
            </MoveLeftModal>
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
    font-weight: 700;
    align-items: center;
    margin-bottom: 32px;    

    p {
        font-size: 20px;
        cursor: pointer;
        margin-right: 24px;
        font-weight: 500;
        margin-top: 4px;
    }

    h2 {
        font-size: 20px;
        margin-top: 0px;
        line-height: 24.96px;
        font-weight: 700;
    }
`

const Textlocal = styled.div`

    h1 {
        font-family: 'SUIT';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 160%;
        margin-bottom: 31px;
    }
`

const SelectBox = styled.div`
    height: 138px;
    width: 100%;
    border-radius: 0px;
    padding: 0px 0px 0px 16px;

    p {
        margin-left: 15px;
    }
`

const AllSelcet = styled.div`
    display: flex;
    flex-direction: row;
    height: 50px;
    align-items: center;
    border-bottom: 1px solid #ccc;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
`

const OtherSelect = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    div {
        display: flex;
        align-items: center;
        height: 50px;
    }

    p {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        color: black;
    }
`
const RightGo = styled.div`
    display: flex;
    justify-content: space-between;

    h4 {
        cursor: pointer;
        color:${(props) => props.theme.themeColor};
        font-size: 14px;
        font-weight: 700;
    }
`
const Onbutton = styled.button`
    margin-top: 200px;
    width: 343px;
    height: 41px;
    border-radius: 8px;
    border: none;
    background-color:${(props) => props.theme.themeColor};
    color: white;
`

const NonButton = styled.button`
    margin-top: 200px;
    width: 343px;
    height: 41px;
    border-radius: 8px;
    border: none;
    background-color:${(props) => props.theme.themeColor};
    color: white;
    pointer-events: none;
    opacity: 0.5;
`


export default SignUpPage2