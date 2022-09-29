import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import _ from "lodash";

import { Btn, OpacityModal, PageField, TextField } from "components/common";
import { LeftArrow, Location } from "assets/icons";
import { kakaoMap } from "utils";

const SearchModal = ({ toggle, selectLocation, selectTarget }) => {
  const geocoder = kakaoMap.createGeocoder();
  const { register, resetField, setFocus } = useForm();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (toggle) {
      setList([]);
      resetField("search");
      setFocus("search");
    }
  }, [toggle, resetField, setFocus]);

  // 객체에서 주소값, 좌표값 필터
  const addressFilter = (ob) => {
    return { address: ob.address_name, coord: { x: Number(ob.x), y: Number(ob.y) } };
  };

  // 검색
  const searchHandler = async (e) => {
    const address = e.target.value;

    if (!address) {
      setList([]);
      return;
    }

    geocoder.addressSearch(address, (result, status) => {
      if (status === "OK") {
        setList(_.map(result, addressFilter));
      }
    });
  };

  // geo옵션
  const geolocationOpt = {
    enableHighAccuracy: true, // 정밀도 활성화
    timeout: 1000 * 60, // 응답 대기시간 : 1 분
    maximumAge: 1000 * 3600 * 24, // 캐시 수명 : 24시간
  };

  // 내위치 리스트에 저장
  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        geocoder.coord2Address(position.coords.longitude, position.coords.latitude, (result, status) => {
          if (status === "OK") {
            const address = result[0].road_address ? result[0].road_address : result[0].address;

            geocoder.addressSearch(address.address_name, (result, status) => {
              if (status === "OK") {
                selectLocation(_.map(result, addressFilter)[0]);
              }
            });
          }
        });
      },

      () => {},

      geolocationOpt
    );
  };

  // register옵션
  const registerOpt = {
    onChange: _.debounce(searchHandler, 200),
  };

  return (
    <OpacityModal toggle={toggle}>
      <PageField
        icon={
          <div
            className="btn"
            onClick={() => {
              selectTarget(null);
            }}
          >
            <LeftArrow className="sm" />
          </div>
        }
        title="주소 검색"
      >
        <TextField>
          <input autoComplete="off" placeholder="시/군/구로 검색" {...register("search", registerOpt)} />
        </TextField>

        <List>
          {list.map((location) => {
            return (
              <LocationInfo key={`${location.coord.x}-${location.coord.y}`} onClick={() => selectLocation(location)}>
                <div>
                  <Location className="sm" />
                </div>
                {location.address}
              </LocationInfo>
            );
          })}

          {list.length === 0 && <Btn onClick={getMyLocation}>내 위치 찾기</Btn>}
        </List>
      </PageField>
    </OpacityModal>
  );
};

export default SearchModal;

const List = styled.div`
  margin-top: 2rem;
  cursor: pointer;
`;

const LocationInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding: 1.2rem 0;

  border-bottom: 0.1rem solid ${(props) => props.theme.color.disable};

  font-size: 1.4rem;

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    margin-right: 1rem;
    color: ${(props) => props.theme.color.black.light};
  }
`;
