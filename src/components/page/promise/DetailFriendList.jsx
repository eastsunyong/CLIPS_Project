import React from "react";
import styled from "styled-components";
import _ from "lodash";

import { useXDrag } from "hooks";

const DetailFriendList = ({ fList }) => {
  const [ref, start, end, moving] = useXDrag();

  return (
    <Container ref={ref} onMouseDown={start} onMouseMove={_.throttle(moving, 50)} onMouseUp={end} onMouseLeave={end}>
      <div className="list">
        {fList.map((friend, i) => {
          return <FriendDiv key={friend.nickname + i}>{friend.nickname}</FriendDiv>;
        })}
      </div>
    </Container>
  );
};

export default DetailFriendList;

const Container = styled.div`
  width: 100%;
  overflow: scroll;

  .list {
    display: flex;
    min-width: max-content;
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
