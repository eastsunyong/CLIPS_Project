import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  return(
  <Container className="fcc"> 
    <div>
        <p>nickname</p>
        <input/>
    </div>
    <div>
        <p>비밀번호</p>
        <input/>
    </div>
    <button>로그인</button>
    <h2 onClick={()=> {navigate('/signup')}}>회원가입</h2>
  </Container>
  ) 
};


const Container = styled.div`
flex-direction: column;
margin-top: 20rem;

  p{
    font-size: 2rem;
  }

  input {
    height: 3rem;
    width: 20rem;
    padding: 0.5rem;
  }
`

export default Login;
