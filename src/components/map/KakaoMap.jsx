import React, { forwardRef, memo } from "react";
import styled from "styled-components";
import { Map } from "react-kakao-maps-sdk";

const KakaoMap = forwardRef((props, ref) => {
  return (
    <Container ref={ref} level={12} center={{ lat: 37.5023270151927, lng: 127.044444694599 }} isPanto={true} id={props.id}>
      {props.children}
    </Container>
  );
});

export default memo(KakaoMap);

const Container = styled(Map)`
  width: 100%;
  height: 100%;
  & > div:nth-last-child(2) {
    display: none;
  }
`;
