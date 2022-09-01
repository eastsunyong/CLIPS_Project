import React, { useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HomeOrderFirst from "components/home/HomeOrderFirst";
import HomeOrderSecond from "components/home/HomeOrderSecond";
import HomeOrderThird from "components/home/HomeOrderThird";

const Home = () => {
  const [page, setPage] = useState(0);
  const [type, setType] = useState(true);
  // 차후 전역 상태관리 라이브러리 정해지면 컴포넌트 자체 상태에서 변경예정
  const [selected, setSelected] = useState(null);
  return (
    <Slider page={page}>
      <HomeOrderFirst setPage={setPage} setType={setType} />
      <HomeOrderSecond setPage={setPage} setSelected={setSelected} type={type} />
      <HomeOrderThird selected={selected} />
    </Slider>
  );
};

const Slider = styled.div`
  position: relative;
  top: 0;
  left: calc(${(props) => props.page * -100}%);
  transition-duration: 0.8s;
  display: flex;
  height: 100%;
`;

export default Home;
