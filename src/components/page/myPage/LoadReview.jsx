import React from "react";
import styled from "styled-components";

//아이콘
import { HiOutlineLocationMarker } from "react-icons/hi";

const LoadReview = ()=> {

    return (
        <>
        {/* 맵돌릴거임 */}
        <PromiseList>
            <div>
            <UserImg/>
            </div>
            <div>
                <p>asdasdasdasdasdasd
                    asdasdassdasd
                    asdasdasdasdasdasdas
                    asdasdasd
                </p>
            </div>
            <div>
                <p>2022. 09. 12 18:00</p>
                <p><HiOutlineLocationMarker/> 장소임</p>
            </div>
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

        div {
            display: flex;
            flex-direction: row;
            gap: 16px;
            margin-bottom: 17px;
        }
`

const UserImg = styled.img`
    border: 1px solid red;
    width: 311px;
    height: 50px;
    background-color: aqua;
    border-radius: 12px;
    display: flex;
`

export default LoadReview