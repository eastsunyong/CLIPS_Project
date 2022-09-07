import React, { useState } from "react";

import { GetMiddleModal, HomeMain, LocationSearchModal } from "components/home";

const Home = () => {
  const [address, setAddress] = useState(null);
  const [leftToggle, setLeftToggle] = useState(false);
  const [opaToggle, setOpaToggle] = useState(false);

  return (
    <>
      <HomeMain setLeftToggle={setLeftToggle} setOpaToggle={setOpaToggle} address={address} />
      <GetMiddleModal toggle={leftToggle} setToggle={setLeftToggle} setAddress={setAddress} />
      <LocationSearchModal toggle={opaToggle} setToggle={setOpaToggle} setAddress={setAddress} />
    </>
  );
};

export default Home;
