import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { SearchIcon } from "assets/icons";
import { Map } from "components/common";
import { MarkerDetailModal, LocationSearchModal } from ".";
import { setAddress2coord } from "store/modules/mapSlice";

const HomeMain = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.home.address);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (address) {
      dispatch(setAddress2coord(address));
    }
  }, [address]);

  return (
    <>
      <Section className="fcc">
        <SectionTop>
          <SearchBar
            className="fcc"
            onClick={() => {
              setToggle(true);
            }}
          >
            <input placeholder="시/군/구로 검색" defaultValue={address} readOnly />
            <div>
              <SearchIcon />
            </div>
          </SearchBar>
        </SectionTop>

        <MarkerDetailModal />
        <Map />
      </Section>
      <LocationSearchModal toggle={toggle} setToggle={setToggle} />
    </>
  );
};

export default HomeMain;

const Section = styled.div`
  position: relative;
  flex-flow: column;
  width: 100%;
  height: 100%;
  .map {
    position: absolute !important;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

const SectionTop = styled.div`
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
  height: calc(${(props) => props.theme.size.m} * 2);
  padding: ${(props) => props.theme.size.s} calc(${(props) => props.theme.size.s} * 2);
`;

const SearchBar = styled.div`
  cursor: pointer;
  padding: ${(props) => props.theme.size.s} calc(${(props) => props.theme.size.s} * 2);

  background: white;
  border-radius: ${(props) => props.theme.size.m};
  box-shadow: 0 0.2rem 1rem rgba(17, 24, 39, 0.15);

  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    cursor: inherit;
    border: none;
    outline: none;
    width: 100%;

    font-size: ${(props) => props.theme.fontSize.s};
    &::placeholder {
      color: ${(props) => props.theme.iconsColor.disable};
    }
  }

  div {
    margin-left: ${(props) => props.theme.size.s};
    fill: ${(props) => props.theme.iconsColor.disable};
  }
`;
