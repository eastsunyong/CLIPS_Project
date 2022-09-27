import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Btn } from "components/common";
import defaultImg from "assets/img/UserDefaultImg.png";
import { RightArrow } from "assets/icons";
import { sweetalert, download } from "utils";
import { myPageAPI } from "apis";
import { __signout } from "store/modules/loginSlice";

const User = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [user, setUser] = useState();

  const getMypage = async () => {
    const answer = await myPageAPI.getUser();
    setUser([answer.user]);
  };

  useEffect(() => {
    getMypage();
  }, []);

  return (
    <Section>
      {user?.map((a) => {
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
              <OutBtn
                className="fcc"
                onClick={() => {
                  sweetalert.avatarAlert();
                }}
              >
                프로필 편집
              </OutBtn>
            </div>
          </div>
        );
      })}

      {download.deferredInstallPrompt ? (
        <>
          <Notice>
            <p>앱 다운로드</p>
            <h4 onClick={download.userClickedAddToHome}>
              <RightArrow className="sm" />
            </h4>
          </Notice>
          <Line />
        </>
      ) : null}

      <Notice>
        <p>공지사항</p>
        <h4>
          <RightArrow className="sm" />
        </h4>
      </Notice>
      <Notice>
        <p>이용약관</p>
        <h4>
          <RightArrow className="sm" />
        </h4>
      </Notice>
      <Notice>
        <p>개인정보 처리 방침</p>
        <h4>
          <RightArrow className="sm" />
        </h4>
      </Notice>
      <Line />
      <Notice>
        <p
          style={{ color: "red" }}
          onClick={() => {
            dispatch(__signout());
            nav("/");
          }}
        >
          로그아웃
        </p>
      </Notice>
    </Section>
  );
};

const Section = styled.div`
  justify-content: flex-start !important;
  padding: 3.2rem 1.6rem;
  display: flex;
  flex-direction: column;
`;
const Profile = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: inherit;
    height: inherit;
  }
`;
const Info = styled.div`
  margin-left: 1.6rem;
  font-size: 1.2rem;
`;
const NickName = styled.p`
  font-size: 1.8rem;
  span {
    font-weight: bold;
  }
`;
const Phone = styled.p`
  color: ${(props) => props.theme.color.black.light};
  margin-top: 0.3rem;
`;

const Sort = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const OutBtn = styled(Btn)`
  background-color: white;
  border: 1px solid #d9d9d9;
  color: #333333;
  font-family: "SUIT";
  font-style: normal;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.5rem;
  margin-top: 1.2rem;
  height: 3.1rem;
  margin-bottom: 2.4rem;
`;

const Notice = styled.div`
  height: 4.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.6rem;
  font-family: "SUIT";
  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2rem;

  & > :last-child {
    cursor: pointer;
  }

  h4 {
    cursor: pointer;
  }
`;

const Line = styled.div`
  height: 0.6rem;
  background-color: #f0f0f0;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  margin: 0.8rem 0;
`;

export default User;
