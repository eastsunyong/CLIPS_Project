import React from "react";
import styled from "styled-components";
import { loginAPI, myPageAPI } from "apis";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import defaultImg from "assets/img/UserDefaultImg.png";
import { isLogin } from "store/modules/loginSlice";
import { sweetalert } from "utils";
import { Btn } from "components/common";
import { useState } from "react";
import { RightArrowIcon } from "assets/icons";

const User = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  const getMypage = async () => {
    const answer = await myPageAPI.getUser()
    setUser([answer.user])
  }


  const onsubmit = async () => {
    const refreshToken = localStorage.getItem("refreshToken")
    const answer = await loginAPI.logout(refreshToken);
    if (answer.result) {
      dispatch(isLogin(false))
      localStorage.clear()
    } else {
      sweetalert.warningAlert("이미 로그아웃된 상태입니다")
      dispatch(isLogin(false));
      localStorage.clear()
    }
  }

  useEffect(() => {
    getMypage()
  }, []);

  return (
    <Section>
      {
        user?.map((a) => {
          return (
            <div key={a.userId}>
              <Sort>
                <Profile>
                  <img src={defaultImg} />
                </Profile>
                <Info>
                  <NickName>
                    <span>{a.name}</span>님
                  </NickName>
                  <Phone>{a.phone}</Phone>
                </Info>
              </Sort>
              <div>
                <OutBtn className="fcc" onClick={()=> {
                    sweetalert.avatarAlert()
                }}>프로필 편집</OutBtn>
              </div>
            </div>
          )
        })
      }
      <Notice>
        <p>북마크</p>
        <h4><RightArrowIcon /></h4>
      </Notice>
      <Line/>
      <Notice>
        <p>공지사항</p>
        <h4><RightArrowIcon /></h4>
      </Notice>
      <Notice>
        <p>이용약관</p>
        <h4><RightArrowIcon /></h4>
      </Notice>
      <Notice>
        <p>개인정보 처리 방침</p>
        <h4><RightArrowIcon /></h4>
      </Notice>
      <Line/>
      <Notice>
        <p onClick={onsubmit}>로그아웃</p>
      </Notice>
    </Section>
  );
};

const Section = styled.div`
  justify-content: flex-start !important;
  padding: calc(${(props) => props.theme.size.m} * 2) ${(props) => props.theme.size.m};
  display: flex;
  flex-direction: column;
`;
const Profile = styled.div`
  width: calc(${(props) => props.theme.size.m} * 3);
  height: calc(${(props) => props.theme.size.m} * 3);
  border-radius: 50%;
  overflow: hidden;
  img {
    width: inherit;
    height: inherit;
  }
`;
const Info = styled.div`
  margin-left: ${(props) => props.theme.size.m};
  font-size: ${(props) => props.theme.size.xs};
`;
const NickName = styled.p`
  font-size: ${(props) => props.theme.size.l};
  span {
    font-weight: bold;
  }
`;
const Phone = styled.p`
  color: ${(props) => props.theme.color.disable};
  margin-top:0.3rem;
  
`;

const Sort = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const OutBtn = styled(Btn)`
  background-color: white;
  border: 1px solid #D9D9D9;
  color : #333333;
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => props.theme.size.xs};
  line-height: 15px;
  margin-top: ${(props) => props.theme.size.xs};
  height: 3.1rem;
  margin-bottom: 2.4rem;
`

const Notice =styled.div`
  height: 4.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px ${(props) => props.theme.size.m};
  font-family: 'SUIT';
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => props.theme.size.m};
  line-height: ${(props) => props.theme.size.xl};

  & > :last-child {
      color: red;
      cursor: pointer;
  }

  h4 {
    cursor: pointer;
  }
`

const Line = styled.div`
  height: 6px;
  background-color: #F0F0F0;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  margin: 0.8rem 0px;
`

export default User;
