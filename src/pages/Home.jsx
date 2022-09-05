import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { SearchIcon, GeoIcon, PinIcon } from "assets/icons";
import { Map } from "components/common/map";
import { Btn } from "components/common";
import { GetMiddleModal, LocationSearchModal } from "components/home";
import { InputBar } from "components/home/common";

const Home = () => {
  const { handleSubmit, register, setValue } = useForm();
  const [leftToggle, setLeftToggle] = useState(false);
  const [opaToggle, setOpaToggle] = useState(false);
  const [target, setTarget] = useState(null);
  return (
    <>
      <Section className="fcc">
        <form className="top" onSubmit={handleSubmit((data) => console.log(data))}>
          <InputBar
            onClick={() => {
              setOpaToggle(true);
              setTarget("center");
            }}
          >
            <input {...register("center")} className="inner" placeholder="시/군/구로 검색" readOnly />
            <div className="icon">
              <SearchIcon />
            </div>
          </InputBar>
        </form>

        <div className="fcc bottom">
          <GetMiddleBtn
            onClick={() => {
              setLeftToggle(true);
            }}
          >
            <PinIcon />
            <span>중간은 어디?</span>
          </GetMiddleBtn>
          <BottomBtn>
            <GeoIcon />
          </BottomBtn>
        </div>

        <Map />
      </Section>

      <GetMiddleModal toggle={leftToggle} setToggle={setLeftToggle} target={target} setValue={setValue} />
      <LocationSearchModal toggle={opaToggle} setToggle={setOpaToggle} target={target} setValue={setValue} />
    </>
  );
};

const Section = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  & > *:not(:last-child) {
    position: absolute;
    width: 100%;
    padding: ${(props) => props.theme.size.s} calc(${(props) => props.theme.size.s} * 2);
    z-index: 2;
  }
  .top {
    top: 0;
  }
  .bottom {
    justify-content: space-between !important;
    bottom: 0;
  }
`;

const BottomBtn = styled(Btn)`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: bold;

  padding: ${(props) => props.theme.size.s};
  border-radius: ${(props) => props.theme.size.m};

  & > :first-child {
    width: ${(props) => props.theme.fontSize.s};
    height: ${(props) => props.theme.fontSize.s};
  }
`;

const GetMiddleBtn = styled(BottomBtn)`
  background: ${(props) => props.theme.themeColor};
  & > :first-child {
    margin-right: calc(${(props) => props.theme.size.s} / 2);
  }
  & > * {
    filter: invert(100%);
  }
`;

export default Home;
