import React, { useRef, useState } from "react";
import styled from "styled-components";
import _ from "lodash";

const XDragList = (props) => {
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };
  return (
    <List ref={scrollRef} onMouseDown={onDragStart} onMouseMove={_.throttle(onDragMove, 50)} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}>
      {props.children}
    </List>
  );
};

export default XDragList;

const List = styled.div`
  cursor: pointer;
  position: relative;
  z-index: ${(props) => props.theme.level.front.low};
  overflow-x: scroll;

  display: flex;

  width: 100%;
  padding: ${(props) => props.theme.size.xs} ${(props) => props.theme.size.m};

  &::-webkit-scrollbar {
    display: none;
  }

  & > *:not(:last-child) {
    margin-right: calc(${(props) => props.theme.size.xs} / 2);
  }
`;
