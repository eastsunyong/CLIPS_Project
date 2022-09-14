import React from "react";
import styled from "styled-components";

//아이콘
import { HiOutlineLocationMarker } from "react-icons/hi";

const CreateReview = ()=> {

    return (
        <>
        <PromiseList>
            <h1>asd</h1>
            <h2>qweqweqweqweqweqweweqwewqe</h2>
            <div>
                <p>2022. 09. 12 18:00</p>
                <p><HiOutlineLocationMarker/> 장소임</p>
            </div>
            <button>후기쓰기</button>
        </PromiseList>
        </>
    )
}

const PromiseList =styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;

    width: 343px;
    height: 151px;

    background: #FFFFFF;
    box-shadow: 0px 2px 8px rgba(75, 85, 99, 0.25);
    border-radius: 12px;

    h1 {
        font-family: 'SUIT';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 4px;
    }

    h2{
        width: 65px;
        height: 15px;
        margin-bottom: 16px;
        font-family: 'SUIT';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
    
        color: #4B5563;
    }

        div {
            display: flex;
            flex-direction: row;
            gap: 16px;
            margin-bottom: 17px;
        }
    button {
        display: flex;
        justify-content: center;
        padding: 8px 16px;
        width: 311px;
        height: 32px;
        background: #0099FF;
        color: white;
        border-radius: 8px;
        border: none;

        font-family: 'SUIT';
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 16px;
    }
`

export default CreateReview