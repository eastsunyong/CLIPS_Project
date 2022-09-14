import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//아이콘
import { AiOutlineLeft } from 'react-icons/ai';

import serverAxios from "components/tokken/Tokken";
import { MoveLeftModal } from "components/common/modal";
import { DetailPromiseEdit } from "components/promise";

const DetailPromise = () => {

  const navigate = useNavigate()

    const {promiseId} = useParams();
    console.log(promiseId)

    //모달창 상태값
    const [toggle, setToggle] =useState(false)

    //상세 약속 데이터 저장
    const [detailList, setDetailList] = useState({})

    useEffect(() => {
        const DetailGetData = async () => {
          try {
            const axiosData = await serverAxios.get(process.env.REACT_APP_SURVER + `/api/promise/${promiseId}`) 
            const result = axiosData.data
            console.log(result)
            setDetailList(result)
          } catch (err) {
            console.log(err);
          }
        };
        DetailGetData();
      }, []) 


  return (
    <All>
      <Container>
      <Header>
        <div>
           <p><AiOutlineLeft onClick={()=>{navigate(`/promised`)}}/></p>
        <h1>약속 상세</h1> 
        </div>
            <h2 onClick={()=> {setToggle(!toggle)}}>편집</h2>
      </Header>

        <InputArea>
          <h1>철수나 누구나 명희나</h1>
          <PromiseDate>
            <p>약속 날짜</p>
            <h3>2022. 09. 13.오전 8:12</h3>
          </PromiseDate>
          <div>
            <p>멤버</p>
            <PromiseMember>윤선용</PromiseMember>
          </div>
          <div>
            <p>약속장소</p>
            <h3>약속장소 뽑는곳임</h3>
              아마도 지도 놓을곳
          </div>
        </InputArea>
    
      <MoveLeftModal toggle={toggle}>
          <DetailPromiseEdit setToggle={setToggle}/>
        </MoveLeftModal>
      </Container>

    </All>
  )
};

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
    justify-content: space-between;
    margin-bottom: 36px;

    div {
        align-items: center;
        display: flex;
        flex-direction: row;
    h2 {
        font-size: 20px;
        line-height: 24px;
        font-weight: 700;
        color: black;
    }
    p {
        font-size: 20px;
        cursor: pointer;
        margin-right: 24px;
        font-weight: 500;
        margin-top: 4px;
    }
    }

    h2 {
        font-size: 20px;
        line-height: 24px;
        font-weight: 700;
        color:${(props) => props.theme.themeColor};
        cursor: pointer;
    }
`


const Container = styled.div`

  flex-direction: column;
  justify-content: center;
  display: flex;
  margin-top: 10px;

    h1 {
      font-family: 'SUIT';
      font-style: normal;
      font-weight: 700;
      font-size: 20px;
      line-height: 25px;
    }
`

const InputArea = styled.div`
  p {
    margin-top: 24px;
    margin-bottom: 8px;
    font-family: 'SUIT';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
  }
`

const PromiseDate = styled.div`
  margin-top: 32px;
`

const PromiseMember = styled.div`
  width: 48px;
  height: 23px;
  border: 1px solid red;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default DetailPromise;
