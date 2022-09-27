import { Search } from "assets/icons";
import { useXDrag } from "hooks";
import _ from "lodash";
import React from "react";
import styled from "styled-components";

const ReviewImgList = ({ image, setImgToggle }) => {
  const [ref, start, end, moving, isDrag] = useXDrag();

  return (
    <ImgArea ref={ref} onMouseDown={start} onMouseMove={_.throttle(moving, 50)} onMouseUp={end} onMouseLeave={end}>
      {image.map((url) => {
        return (
          <ImgBox key={url} bgUrl={url}>
            <div
              onClick={() => {
                if (!isDrag) setImgToggle({ toggle: true, url });
              }}
            >
              <Search className="lg" />
            </div>
          </ImgBox>
        );
      })}
    </ImgArea>
  );
};

export default ReviewImgList;

const ImgArea = styled.div`
  cursor: pointer;
  overflow: scroll;
  width: 100%;

  & > *:not(:first-child) {
    margin-left: 0.8rem;
  }
`;

const ImgBox = styled.div`
  position: relative;
  min-width: 100%;
  height: 20rem;

  border: 0.1rem solid ${(props) => props.theme.color.disable};
  border-radius: 0.8rem;

  background: ${(props) => `url(${props.bgUrl})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  div {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 1rem;
    color: ${(props) => props.theme.color.brand};
  }
`;
