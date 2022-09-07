import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";

import { OpacityModal } from "components/common/modal";
import { ModalTop, BackBtn, BottomBtn, ModalMain } from "./common";
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
      <ModalTop className="fcc">
        <BackBtn onClick={modalClose}>
          <IoIosArrowBack />
        </BackBtn>
        <p>주소 검색</p>
      </ModalTop>
      <LSMMain className="fcc" onSubmit={handleSubmit(getAddressList)}>
        <input {...register("search", registerOpt)} type="search" placeholder="시/군/구로 검색" autoComplete="off" />
        <ListArea>
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
        </ListArea>
        {list.length === 0 ? <GeoBtn type="button" value="내 위치 찾기" onClick={getMyLocation} /> : null}
      </LSMMain>
    </OpacityModal>
  );
};

export default LocaionSearchModal;

const LSMMain = styled(ModalMain)`
  position: relative;
  input {
    border-radius: ${(props) => props.theme.size.s};
  }
  input[type="search"] {
    position: sticky;
    top: 0;
    margin: calc(${(props) => props.theme.size.m} / 2);
    border: 0.1rem solid gray;
  }
`;

const ListArea = styled.div`
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
  padding: ${(props) => props.theme.fontSize.s};
  font-size: ${(props) => props.theme.fontSize.s};
  p:last-child {
    margin-top: calc(${(props) => props.theme.size.s} / 2);
    font-size: calc(${(props) => props.theme.fontSize.s} / 1.2);
    color: gray;
  }
`;

const GeoBtn = styled(BottomBtn)`
  border-radius: ${(props) => props.theme.size.s};
  background: ${(props) => props.theme.themeColor};
  color: white;
  font-weight: bold;
`;
