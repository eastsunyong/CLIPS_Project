import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { TextField } from "components/common";
import { BottomModal, CategoryList, MainMap, GetMiddleModal, SearchModal } from "components/page/main";
import { Search } from "assets/icons";
import { resetMainState } from "store/modules/mainSlice";
import { useSearch } from "hooks";

const Main = () => {
  const dispatch = useDispatch();

  const infoView = useSelector((state) => state.main.infoView);

  // 주소검색 커스텀훅
  const { register, selectTarget, location, selectLocation, toggle } = useSearch();

  // 마운트시 초기화
  useEffect(() => {
    dispatch(resetMainState());
  }, []);

  return (
    <>
      <Section infoView={infoView}>
        <SearchBar
          className="topContral"
          onClick={() => {
            selectTarget("center");
          }}
        >
          <input readOnly autoComplete="off" placeholder="주소로 검색" {...register("center")} />
          <div>
            <Search className="md" />
          </div>
        </SearchBar>

        <CategoryList className="topContral" />

        <MainMap location={location} />
        <BottomModal />
      </Section>
      <SearchModal toggle={toggle} selectLocation={selectLocation} selectTarget={selectTarget} />
      <GetMiddleModal />
    </>
  );
};

export default Main;

const Section = styled.section`
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 100%;
  padding: 1.6rem 0;

  #mainMap {
    position: absolute;
    top: 0;
  }

  .topContral {
    position: relative;
    z-index: ${(props) => (props.infoView ? props.theme.level.back : props.theme.level.front.low)};
  }
`;

const SearchBar = styled(TextField)`
  cursor: pointer;

  padding: 1rem 1.8rem;
  margin: 0 1.6rem;

  border: none;
  box-shadow: 0px 0.2rem 1rem rgba(17, 24, 39, 0.15);
  input {
    cursor: pointer;
  }
  .md {
    color: ${(props) => props.theme.color.black.light};
  }
`;
