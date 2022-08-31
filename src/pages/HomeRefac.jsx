import React, { useRef, useState } from "react";
import styled from "styled-components";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HomeOrderFirst from "components/home/HomeOrderFirst";
import HomeOrderSecond from "components/home/HomeOrderSecond";

const Home = () => {
  const [type, setType] = useState(true);
  const carouselRef = useRef(null);

  const carouselOpt = {
    dots: false,
    arrows: false,
    isFinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    speed: 500,
  };

  return (
    <>
      <CustomCarousel {...carouselOpt} className="fcc" ref={carouselRef}>
        <HomeOrderFirst setType={setType} ref={carouselRef} />
        <HomeOrderSecond type={type} ref={carouselRef} />
      </CustomCarousel>
    </>
  );
};

const CustomCarousel = styled(Carousel)`
  // 캐로셀이 main 구역 전부 차지하도록 css
  &,
  .slick-list,
  .slick-track,
  .slick-slide > div {
    height: 100%;
  }
`;

export default Home;
