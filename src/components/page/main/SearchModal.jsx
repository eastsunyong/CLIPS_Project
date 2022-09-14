import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { Btn, InputDiv, OpacityModal, PageTop } from "components/common";
import { LeftArrowIcon } from "assets/icons";
import { localAPI } from "apis";

const SearchModal = (props) => {
  const { handleSubmit, register, reset } = useForm();
  const [list, setList] = useState([]);

  // 모달 열릴때 초기화
  useEffect(() => {
    if (props.toggle) {
      reset();
      setList([]);
    }
  }, [props.toggle]);

  // list 저장
  const setAddressList = (arr) => {
    setList([]);
    arr.forEach((doc) => {
      let address = doc.address_name;
      if (!address) {
        const addressInfo = doc.road_address ? doc.road_address : doc.address;
        address = addressInfo.address_name;
      }
      setList((addressList) => {
        return [...addressList, address];
      });
    });
  };

  // 검색
  const getAddressList = async (data) => {
    const answer = await localAPI.searchAddress(data.search);
    if (answer.result) setAddressList(answer.docs);
  };

  // 리스트중 지역 선택
  const selectLocation = (address) => {
    const target = props.target ? props.target : "mainLocation";
    props.setValue(target, address);
    props.setToggle(!props.toggle);
  };

  // geo옵션
  const geolocationOpt = {
    enableHighAccuracy: true, // 정밀도 활성화
    timeout: 1000 * 60, // 응답 대기시간 : 1 분
    maximumAge: 1000 * 3600 * 24, // 캐시 수명 : 24시간
  };

  // 내위치 리스트에 저장
  const getMyLocation = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const answer = await localAPI.addressTransfer(position.coords.longitude, position.coords.latitude);
        if (answer.result) setAddressList(answer.docs);
      },
      () => {},
      geolocationOpt
    );
  };

  // register옵션
  const registerOpt = {
    required: "검색어를 입력해주세요",
  };

  return (
    <OpacityModal toggle={props.toggle}>
      <PageTop>
        <div>
          <span
            className="icon"
            onClick={() => {
              props.setToggle(!props.toggle);
            }}
          >
            <LeftArrowIcon />
          </span>
          <span className="title">주소 검색</span>
        </div>
      </PageTop>
      <SearchArea>
        <form onSubmit={handleSubmit(getAddressList)}>
          <InputDiv>
            <input {...register("search", registerOpt)} type="search" placeholder="시/군/구로 검색" autoComplete="off" />
          </InputDiv>
        </form>

        <LocationList>
          {list.map((address, i) => {
            return (
              <Location
                key={address + i}
                onClick={() => {
                  selectLocation(address);
                }}
              >
                {address}
              </Location>
            );
          })}
        </LocationList>

        {list.length === 0 ? <Btn onClick={getMyLocation}>내 위치 찾기</Btn> : null}
      </SearchArea>
    </OpacityModal>
  );
};

export default SearchModal;

const SearchArea = styled.div`
  padding: 0 ${(props) => props.theme.size.m};
`;

const LocationList = styled.div`
  padding-top: calc(${(props) => props.theme.size.xs} * 2);
`;

const Location = styled.div`
  cursor: pointer;
  padding: ${(props) => props.theme.size.xs} 0;

  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);

  font-size: ${(props) => props.theme.size.s};
  font-weight: 500;
`;
