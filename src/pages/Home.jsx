import React, { useRef, useState } from "react";
import styled from "styled-components";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HomeOrderFirst from "components/home/HomeOrderFirst";
import HomeOrderSecond from "components/home/HomeOrderSecond";

const Home = () => {
  const [type, setType] = useState(null);
  const [location, setLocation] = useState(null);
  const carouselRef = useRef(null);

  const carouselOpt = {
    dots: false,
    isFinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
  };

  return (
    <CustomCarousel {...carouselOpt} className="fcc" ref={carouselRef}>
      <HomeOrderFirst setType={setType} ref={carouselRef} />
      <HomeOrderSecond type={type} setLocation={setLocation} ref={carouselRef} />
    </CustomCarousel>
  );
};

const CustomCarousel = styled(Carousel)`
  &,
  .slick-list,
  .slick-track {
    height: 100% !important;
  }
  .slick-slide {
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
`;

export default Home;
