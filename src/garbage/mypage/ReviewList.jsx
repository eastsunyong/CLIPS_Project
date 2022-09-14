import React from "react";
import styled from "styled-components";
import { useState } from "react";

//아이콘
import { TbPencil } from "react-icons/tb";

import { CreateReview, LoadReview } from "garbage/mypage";

const ReviewList = () => {
  const [on, setOn] = useState(true);

  return (
    <All>
      <Header>
        <div>
          <UserImg />
        </div>
        <UserInformation>
          <HeaderText>
            <h1>강쥐들은천사야님 님</h1>{" "}
            <p>
              <TbPencil />
            </p>
          </HeaderText>
          <h2>0100101010</h2>
        </UserInformation>
      </Header>
      <NavBar>
        <CreateRiview
          onClick={() => {
            setOn(true);
          }}
        >
          <p>후기쓰기</p>
        </CreateRiview>
        <LoadRiview
          onClick={() => {
            setOn(false);
          }}
        >
          <p>작성한 후기</p>
        </LoadRiview>
      </NavBar>
      {on === true ? <CreateReview /> : <LoadReview />}
    </All>
  );
};

const All = styled.div`
  position: relative;
  flex-flow: column;
  min-width: 100%;
  min-height: 100%;
  padding: 0 2rem 2rem 2rem;
  flex-direction: column;
`;

const Header = styled.footer`
  display: flex;
  min-height: 112px;
  background-color: #ccc;
  align-items: center;

  h1 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  h2 {
    font-size: 12px;
    font-weight: 400;
  }
`;

const UserImg = styled.img`
  border: 1px solid red;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: aqua;
  display: flex;
  margin-left: 16px;
`;

const UserInformation = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    margin-left: 9px;
    font-size: 14px;
    cursor: pointer;
  }
`;

const NavBar = styled.div`
  width: 100%;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid red;
  margin-bottom: 16px;
`;

const CreateRiview = styled.div`
  height: 31px;
  width: 50%;
  align-items: center;
  cursor: pointer;

  p {
    margin-top: 0.8rem;
    margin-left: 7rem;
  }
`;

const LoadRiview = styled.div`
  height: 31px;
  width: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  p {
    margin-top: 0.8rem;
    margin-left: 6rem;
  }
`;

export default ReviewList;
