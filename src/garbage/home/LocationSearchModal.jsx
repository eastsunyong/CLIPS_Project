import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";

import { Btn, InputDiv, OpacityModal, PageTop } from "components/common";
import { localAPI } from "apis";
import { setAddress } from "store/modules/homeSlice";

const LocaionSearchModal = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit, register, reset } = useForm();
  const [list, setList] = useState([]);

  // depth2 없어도 되는 지역
  const exceptionArea = {
    세종특별자치시: "예외지역",
    제주특별자치도: "예외지역",
  };

  // 모달 닫으면서 초기화
  const modalClose = () => {
    reset();
    setList([]);
    props.setToggle(!props.toggle);
  };

  // list 저장
  const setAddressList = (arr) => {
    arr.forEach((doc) => {
      const addressInfo = doc.address ? doc.address : doc.road_address;
      if (addressInfo.region_2depth_name === "" && exceptionArea[addressInfo.region_1depth_name] === undefined) {
        alert("최소 구까지 입력해주세요!");
        return;
      }
      const address = {
        addressName: addressInfo.address_name,
        addressCity: addressInfo.region_1depth_name + " " + addressInfo.region_2depth_name,
      };
      setList((addressList) => {
        return [...addressList, address];
      });
    });
  };
  // 검색
  const getAddressList = async (data) => {
    setList([]);
    const answer = await localAPI.searchAddress(data.search);
    if (answer.result) setAddressList(answer.docs);
  };

  // 리스트중 지역 선택
  const selectLocation = (address) => {
    if (props.setValue) {
      props.setValue(props.target, address);
    } else {
      dispatch(setAddress(address));
    }

    modalClose();
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
    setList([]);
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
          <span className="icon" onClick={modalClose}>
            <IoIosArrowBack />
          </span>
          <span className="title">주소 검색</span>
        </div>
      </PageTop>
      <Section className="fcc" onSubmit={handleSubmit(getAddressList)}>
        <SearchInputDiv>
          <input {...register("search", registerOpt)} type="search" placeholder="시/군/구로 검색" autoComplete="off" />
        </SearchInputDiv>
        <List>
          {list.map((address, i) => {
            return (
              <LocationDiv
                key={address.addressName + i}
                className="fcc"
                onClick={() => {
                  selectLocation(address.addressName);
                }}
              >
                <p>{address.addressName}</p>
                <p>{address.addressCity}</p>
              </LocationDiv>
            );
          })}
        </List>
        {list.length === 0 ? (
          <Btn type="button" onClick={getMyLocation}>
            내 위치 찾기
          </Btn>
        ) : null}
      </Section>
    </OpacityModal>
  );
};

export default LocaionSearchModal;

const Section = styled.form`
  flex-flow: column;
  justify-content: flex-start !important;
  width: 100%;
  height: calc(100% - (${(props) => props.theme.size.xs} * 6));
  padding: 0 ${(props) => props.theme.size.m};
`;

const SearchInputDiv = styled(InputDiv)`
  position: sticky;
  top: 0;
  margin-bottom: calc(${(props) => props.theme.size.m} / 2);
`;

const List = styled.div`
  width: 100%;
  max-height: 80%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LocationDiv = styled.div`
  cursor: pointer;
  align-items: flex-start !important;
  flex-flow: column;
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
  padding: ${(props) => props.theme.size.m};
  font-size: ${(props) => props.theme.size.m};

  p:last-child {
    margin-top: calc(${(props) => props.theme.size.m} / 2);
    font-size: ${(props) => props.theme.size.l};
    color: gray;
  }
`;
