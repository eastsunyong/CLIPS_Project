import React, { memo, useState } from "react";
import styled from "styled-components";

import { SearchIcon, GeoIcon, PinIcon } from "assets/icons";
import { InputBar } from "./common";
import { Btn, Map } from "components/common";

const HomeMain = (props) => {
  const [center, setCenter] = useState(false);
  const address = props.address;

  return (
    <Section className="fcc">
      <div className="top">
        <InputBar
          onClick={() => {
            props.setOpaToggle(true);
          }}
        >
          <input className="inner" placeholder="시/군/구로 검색" defaultValue={address} readOnly />
          <div className="icon">
            <SearchIcon />
          </div>
        </InputBar>
      </div>

      <div className="fcc bottom">
        <GetMiddleBtn
          onClick={() => {
            props.setLeftToggle(true);
          }}
        >
          <PinIcon />
          <span>중간은 어디?</span>
        </GetMiddleBtn>
        <BottomBtn
          onClick={() => {
            setCenter(true);
          }}
        >
          <GeoIcon />
        </BottomBtn>
      </div>

      <Map address={address} center={center} setCenter={setCenter} />
    </Section>
  );
};

export default memo(HomeMain);

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
