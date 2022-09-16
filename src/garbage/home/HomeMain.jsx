import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { SearchIcon } from "assets/icons";
import { Map } from "components/map";
import { MarkerDetailModal, LocationSearchModal } from ".";
import { setPlaceList, resetState } from "store/modules/homeSlice";

const HomeMain = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.home.address);
  const [toggle, setToggle] = useState(false);
  const viewPlace = useSelector((state) => state.home.viewPlace);

  // 페이지 이동(컴포넌트 삭제)시 전역상태 초기화
  useEffect(() => {
    return () => dispatch(resetState());
  }, []);

  useEffect(() => {
    if (address) {
      dispatch(setPlaceList(address));
    }
  }, [address]);

  return (
    <>
      <Section>
        {!viewPlace ? (
          <SectionTop>
            <SearchBar
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
        ) : null}

        <MarkerDetailModal />
        <Map />
      </Section>
      <LocationSearchModal toggle={toggle} setToggle={setToggle} />
    </>
  );
};

export default HomeMain;

const Section = styled.div`
  display: flex;
  flex-flow: column;

  width: 100%;
  height: 100%;

  position: relative;
  overflow: hidden;
`;

const SectionTop = styled.div`
  width: 100%;
  height: ${(props) => props.theme.lineHeight};
  padding: ${(props) => props.theme.size.m};

  position: absolute;
  top: 0;
  z-index: ${(props) => props.theme.level.front.low};
`;

const SearchBar = styled.div`
  cursor: pointer;
  display: flex;

  padding: ${(props) => props.theme.size.xs} calc(${(props) => props.theme.size.xs} * 2);

  background: white;
  border-radius: calc(${(props) => props.theme.size.m} * 3);
  box-shadow: 0 0.2rem 1rem rgba(17, 24, 39, 0.15);

  & > * {
    display: flex;
    justify-content: center;
    align-items: center;

    height: calc(${(props) => props.theme.size.xs} * 2);
  }

  input {
    cursor: inherit;
    border: none;
    outline: none;

    width: 100%;
    font-size: ${(props) => props.theme.size.m};
  }

  div {
    margin-left: ${(props) => props.theme.size.s};
    fill: ${(props) => props.theme.color.disable};
  }
`;
