import React from "react";
import styled from "styled-components";


const FindFriend = (props) => {
    return (
        <All>
           <button onClick={()=>{
            props.setPage(0)
           }}>뒤돌아가기</button>
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

export default FindFriend