import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";

import { Modal } from "components/common";
import { localAPI } from "apis";

const LocaionSearchModal = (props) => {
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
    props.setValue(props.target, address);
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
    <Modal toggle={props.toggle}>
      <SearchArea className="fcc" onSubmit={handleSubmit(getAddressList)}>
        <BackBtn className="fcc" onClick={modalClose}>
          <IoIosArrowBack />
        </BackBtn>
        <input {...register("search", registerOpt)} type="search" placeholder="주소를 입력해주세요" autoComplete="off" />
        <SearchBtn>검색</SearchBtn>
      </SearchArea>
      <SearchResultArea>
        {list.length === 0 ? (
          <p className="fcc">
            <CallMyLocationBtn onClick={getMyLocation}>내위치 불러오기</CallMyLocationBtn>
          </p>
        ) : null}

        {list.map((address, i) => {
          const recommenedArea = props.target === "city" ? address.addressCity : address.addressName;
          const anotherArea = props.target === "city" ? address.addressName : address.addressCity;
          return (
            <div
              key={address.addressCity + i}
              className="fcc"
              onClick={() => {
                selectLocation(recommenedArea);
              }}
            >
              <p>
                {props.target === "city" ? "추천 지역 : " : ""}
                {recommenedArea}
              </p>
              <p>{anotherArea}</p>
            </div>
          );
        })}
      </SearchResultArea>
    </Modal>
  );
};

export default LocaionSearchModal;

const SearchArea = styled.form`
  position: sticky;
  top: 0;
  background: white;
  box-shadow: 0 0.3rem 0.3rem -0.3rem;
  padding: 1rem;
  & > * {
    height: 5rem;
  }
  input {
    margin: 0 2rem;
    padding: 1rem;
    flex: 1;
    font-size: 2rem;
  }
`;

const BackBtn = styled.div`
  cursor: pointer;
  width: 5rem;
  font-size: 4rem;
`;

const SearchBtn = styled.button`
  width: 10rem;
  border-radius: 2.5rem;
`;

const SearchResultArea = styled.div`
  flex-flow: column;
  & > * {
    width: 100%;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  div {
    cursor: pointer;
    align-items: flex-start !important;
    flex-flow: column;
    border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
    padding: 2rem;
    font-size: 2rem;
  }
  p:last-child {
    margin-top: 0.5rem;
    font-size: 1.5rem;
    color: gray;
  }
`;

const CallMyLocationBtn = styled.button`
  width: 100%;
  margin: 1rem 3rem;
`;
