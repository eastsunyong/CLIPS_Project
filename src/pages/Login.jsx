import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Indroduce} from "components/login";

const Logins = () => {

    const goPage = useSelector((state) => state.LOGIN.page)

    return(
        <Slider page={goPage}>
            <Indroduce />
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