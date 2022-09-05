import React from "react";
import styled from "styled-components";

const Indroduce = (props) => {

    return (
        <Container className="fcc" style={{ width: "100%", height: "100%" }}>
            <Box>
                <Title>
                    <label>로그인하고</label>
                    <label>더 많은 기능을 만나보세요!</label>
                </Title>
                <button onClick={() => {
                    props.setPage(1);
                    }}>
                    <p>로그인 / 회원가입</p></button>
            </Box>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
  flex-flow: column;
  min-width: 100%;
  min-height: 100%;
  padding: 0 2rem 2rem 2rem;
`


const Box = styled.div`
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: column;
    gap: 3rem;

    label {
        font-size: 3rem;
    }

    button {
        background-color:#0099FF;
        width: 100%;
        height: 41px;
        border: none;
        border-radius: 8px;
        p {
            font-weight: 600;
            color: white;
        }
    }
`

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`

export default Indroduce;