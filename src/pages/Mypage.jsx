import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import defaultImg from "assets/img/UserDefaultImg.png";
import { RightArrow } from "assets/icons";
import { download } from "utils";
import { myPageAPI } from "apis";
import { __signout } from "store/modules/loginSlice";
import { Privacy } from "components/page/login";

const Mypage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [toggle, setToggle] = useState(false);

  const getMypage = async () => {
    const answer = await myPageAPI.getUser();
    setUser([answer.user]);
  };

  useEffect(() => {
    getMypage();
  }, []);

  return (
    <Section>
      <UserInfo key={user && user[0].userId}>
        <Sort>
          <Profile>
            <img src={defaultImg} />
          </Profile>
          <Info>
            <NickName>
              <span>{user && user[0].nickname}</span>님
            </NickName>
            <Phone>{user && user[0].phone}</Phone>
          </Info>
        </Sort>
        {/* <div>
              <OutBtn
                className="fcc"
                onClick={() => {
                  sweetalert.avatarAlert();
                }}
              >
                프로필 편집
              </OutBtn>
            </div> */}
      </UserInfo>

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

      {/* <Notice>
        <p>공지사항</p>
        <h4>
          <RightArrow className="sm" />
        </h4>
      </Notice> */}
      <Notice>
        <p>이용약관</p>
        <h4
          onClick={() => {
            setToggle(true);
          }}
        >
          <RightArrow className="sm" />
        </h4>
      </Notice>
      <Notice>
        <p>개인정보 처리 방침</p>
        <h4
          onClick={() => {
            setToggle(true);
          }}
        >
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
      {toggle === true ? <Privacy toggle={toggle} setToggle={setToggle} /> : null}
    </Section>
  );
};

const Section = styled.div`
  display: flex;
  justify-content: flex-start !important;
  flex-direction: column;
  padding: 3.2rem 1.6rem;
`;

const UserInfo = styled.div`
  margin-bottom: 2rem;
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

// const OutBtn = styled(Btn)`
//   background-color: white;
//   border: 1px solid #d9d9d9;
//   color: #333333;
//   font-family: "SUIT";
//   font-style: normal;
//   font-weight: 600;
//   font-size: 1.2rem;
//   line-height: 1.5rem;
//   margin-top: 1.2rem;
//   height: 3.1rem;
//   margin-bottom: 2.4rem;
// `;

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

export default Mypage;
