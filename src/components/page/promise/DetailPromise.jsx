import React, { memo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import { Modal, PageField } from "components/common";
import { LeftArrow, Location } from "assets/icons";
import { detatilToggle } from "store/modules/promiseSlice";

const DetailPromise = () => {
  const dispatch = useDispatch();
  const selectPromise = useSelector((state) => state.promise.selectPromise);
  const item = selectPromise.promise;
  // const [toggle, setToggle] = useState(false);

  return (
    <Modal toggle={selectPromise.toggle}>
      <PageField
        icon={
          <div className="btn" onClick={() => dispatch(detatilToggle())}>
            <LeftArrow className="md" />
          </div>
        }
        // right={
        //   <div
        //     onClick={() => {
        //       setToggle(!toggle);
        //     }}
        //   >
        //     편집
        //   </div>
        // }
        title="약속 상세"
      >
        <Title>{item?.title}</Title>

        <Content>
          <div className="subTitle">약속날짜</div>
          <div>{item?.date}</div>
        </Content>

        <Content>
          <div className="subTitle">약속 생성자</div>
          <FriendDiv>{item?.nickname}</FriendDiv>
        </Content>

        {item?.countFriend > 0 ? (
          <Content>
            <div className="subTitle">멤버</div>
            <div className="list">
              {item.friendList.map((friend, i) => {
                return <FriendDiv key={friend.nickname + i}>{friend.nickname}</FriendDiv>;
              })}
            </div>
          </Content>
        ) : null}

        {item?.penalty && (
          <Content>
            <div className="subTitle">메모</div>
            <div className="contentIcon">{item.penalty}</div>
          </Content>
        )}

        <Content>
          <div className="subTitle">약속장소</div>
          <div className="contentIcon">
            <Location className="md" />
            {item?.location ? item.location : "장소를 찾을 수 없습니다."}
          </div>
        </Content>

        {item && (
          <Map
            draggable={false}
            disableDoubleClickZoom={true}
            center={{
              lng: item.x,
              lat: item.y,
            }}
            style={{
              width: "100%",
              height: "24rem",
            }}
            level={3}
          >
            <MapMarker
              position={{
                lng: item.x,
                lat: item.y,
              }}
            />
          </Map>
        )}
      </PageField>
    </Modal>
  );
};

export default memo(DetailPromise);

const Title = styled.div`
  padding: 1.6rem 0 0.8rem 0;

  font-size: 2rem;
  font-weight: bold;
`;

const Content = styled.div`
  padding-top: 2.4rem;

  font-size: 1.6rem;
  color: ${(props) => props.theme.color.black.light};

  .contentIcon {
    display: flex;
    & > :first-child {
      margin-right: 0.8rem;
    }
    padding-bottom: 0.8rem;
  }

  .list {
    display: flex;
  }

  .subTitle {
    color: black;
    font-size: 1.4rem;
    font-weight: bold;
    padding-bottom: 0.8rem;
  }
`;

const FriendDiv = styled.div`
  width: max-content;

  margin-right: 0.4rem;
  padding: 0.4rem 0.8rem;

  border: 0.1rem solid ${(props) => props.theme.color.black.light};
  border-radius: 2rem;
  font-size: 1.2rem;
`;
