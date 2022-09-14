import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { MapControl, TopSearch, CategoryBtnArea, BottomModal, PlaceInfo, SearchModal, GetMiddleModal, MainMap } from "components/page/main";
import { GeoIcon, PinIcon, SearchIcon, LeftArrowIcon } from "assets/icons";
import { IconBtn, RoundBtn } from "components/common";

const Main = () => {
  const categoryList = ["음식점", "카페", "술집", "헬스장", "운동장"];
  const { register, setValue, getValues } = useForm();
  // 모달관련 상태
  const [searchToggle, setSearchToggle] = useState(false);
  const [middleToggle, setMiddleToggle] = useState(false);
  const [infoToggle, setInfoToggle] = useState(false);

  // 맵관련 상태
  const [isCenter, setIsCenter] = useState(false);

  // 검색관련 상태
  const [placeInfo, setPlaceInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);

  return (
    <>
      <Section>
        {infoToggle ? null : (
          <>
            <Top>
              <TopSearch
                onClick={() => {
                  setSearchToggle(!searchToggle);
                }}
              >
                <input {...register("mainLocation")} placeholder="시/군/구로 검색" readOnly />
                <div className="icon">
                  <SearchIcon />
                </div>
              </TopSearch>
            </Top>
            <CategoryBtnArea categoryList={categoryList} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </>
        )}

        <BottomModal toggle={infoToggle} viewTitle={!!placeInfo}>
          <MapControl>
            {infoToggle ? (
              <IconBtn
                onClick={() => {
                  setInfoToggle(!infoToggle);
                }}
              >
                <LeftArrowIcon />
              </IconBtn>
            ) : (
              <>
                <RoundBtn
                  selected={true}
                  onClick={() => {
                    setMiddleToggle(!searchToggle);
                  }}
                >
                  <PinIcon />
                  <span>중간은 어디?</span>
                </RoundBtn>

                <IconBtn
                  onClick={() => {
                    setIsCenter(!isCenter);
                  }}
                >
                  <GeoIcon />
                </IconBtn>
              </>
            )}
          </MapControl>

          <PlaceInfo placeInfo={placeInfo} infoToggle={infoToggle} setInfoToggle={setInfoToggle} />
        </BottomModal>
        <MainMap
          address={getValues("mainLocation")}
          categoryList={categoryList}
          selectedCategory={selectedCategory}
          isCenter={isCenter}
          setPlaceInfo={setPlaceInfo}
        />
      </Section>
      <SearchModal toggle={searchToggle} setToggle={setSearchToggle} setValue={setValue} />
      <GetMiddleModal toggle={middleToggle} setToggle={setMiddleToggle} />
    </>
  );
};

export default Main;

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  #mainMap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const Top = styled(MapControl)`
  padding-bottom: 0;
`;