import React, { useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HomeOrderFirst from "components/home/HomeOrderFirst";
import HomeOrderSecond from "components/home/HomeOrderSecond";

const Home = () => {
  const [page, setPage] = useState(0);
  const [type, setType] = useState(true);

  return (
    <Slider page={page}>
      <HomeOrderFirst setPage={setPage} setType={setType} />
      <HomeOrderSecond setPage={setPage} type={type} />
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
