import React from "react";
import styled from "styled-components";
import { useState } from "react";

import { Indroduce,LoginPage,SignUpPage } from "components/login";

const Logins = () => {

    const [page, setPage] = useState(0);

    return(
        <Slider page={page}>
            <Indroduce page={page} setPage={setPage}/>
            <LoginPage setPage={setPage}/>
            <SignUpPage setPage={setPage}/>
        </Slider>
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