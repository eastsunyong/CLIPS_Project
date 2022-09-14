import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Indroduce} from "components/login";
import Mypage from "./Mypage";

const Logins = () => {

     //로그인 상태값 
     const onLogin = localStorage.getItem("accessToken")

    const goPage = useSelector((state) => state.LOGIN.page)

    return(
        <>
        {
            onLogin === null ? <Slider page={goPage}>
            <Indroduce />
        </Slider> : <Mypage/>
        }
        </>
       
    )
}

const Slider = styled.div`
  position: relative;
  top: 0;
  left: calc(${(props) => props.page * -100}%);
  transition-duration: 0.8s;
  display: flex;
  height: 100%;
`;

export default Logins;