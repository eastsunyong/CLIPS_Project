import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { Btn, Modal, PageField, TextField } from "components/common";
import { SearchModal, ViewMiddleModal } from ".";
import { Delete, LeftArrow, Plus } from "assets/icons";
import { middleToggle } from "store/modules/mainSlice";
import { kakaoMap, sweetalert } from "utils";
import { useSearch } from "hooks";

const GetMiddleModal = () => {
  const dispatch = useDispatch();
  const middieView = useSelector((state) => state.main.middleView);

  // 주소검색 커스텀훅
  const { register, unregister, getValues, handleSubmit, selectTarget, location, selectLocation, toggle, reset } = useSearch();

  // input 개수 및 숫자 아이디
  const maxCnt = 10;
  const [numberId, setNumberId] = useState([0, 1]);

  // 결과보기 넘겨줄 상태
  const [viewToggle, setViewToggle] = useState(false);
  const [locationList, setLocationList] = useState({ middle: { address: null, coord: { x: null, y: null } }, list: [] });

  // 모달 열릴때 초기화
  useEffect(() => {
    if (middieView) {
      setNumberId([0, 1]);
      setLocationList({ middle: { address: null, coord: { x: null, y: null } }, list: [] });
      reset();
    } else {
      unregister(`point`);
    }
  }, [middieView, setNumberId, unregister, reset]);

  // input추가
  const addInputHandler = () => {
    if (numberId.length === maxCnt) {
      const msg = `최대 ${maxCnt}개의 장소입니다`;
      sweetalert.timer(msg);
      return;
    }
    setNumberId([...numberId, numberId[numberId.length - 1] + 1]);
  };

  // input 삭제
  const deleteInputHandler = (targetName, targetId) => {
    setNumberId(numberId.filter((id) => id !== targetId));
    if (!!getValues(targetName)) {
      setLocationList({
        ...locationList,
        list: _.filter(locationList.list, (v) => {
          return v.address !== getValues(targetName);
        }),
      });
    }
    unregister(`point.${targetId}`);
  };

  useEffect(() => {
    if (location.address) {
      setLocationList({ ...locationList, list: [...locationList.list, location] });
    }
  }, [location, setLocationList]);

  // 최종 선택 주소 저장 함수
  const geocoder = kakaoMap.createGeocoder();
  const getMiddleLocation = (data) => {
    // 최종 검색 지역 추출
    const list = _.filter(locationList.list, (location) => data.point.find((v) => v === location.address));

    // 중간 지역 좌표 추출
    const middleCoord = _.reduce(
      list,
      (result, location, i, list) => {
        result.x += location.coord.x;
        result.y += location.coord.y;
        if (i === list.length - 1) {
          result.x = result.x / (i + 1);
          result.y = result.y / (i + 1);
        }
        return result;
      },
      { x: 0, y: 0 }
    );

    // 좌표2주소 검색
    geocoder.coord2Address(middleCoord.x, middleCoord.y, (data, status) => {
      if (status === "OK") {
        const middleAddress = data[0].road_address ? data[0].road_address : data[0].address;
        setLocationList({ middle: { address: middleAddress.address_name, coord: middleCoord }, list });
        setViewToggle(!viewToggle);
      } else if (status === "ZERO_RESULT") {
        sweetalert.timer("중간 장소를 찾을 수 없습니다!", "warning");
      }
    });
  };

  return (
    <Modal toggle={middieView}>
      <PageField
        icon={
          <div
            className="btn"
            onClick={() => {
              dispatch(middleToggle());
            }}
          >
            <LeftArrow className="sm" />
          </div>
        }
        title="우리의 중간 장소 찾기"
      >
        <FormArea onSubmit={handleSubmit(getMiddleLocation)}>
          {numberId.map((id, i, source) => {
            const name = `point.${id}`;
            return (
              <FormInner key={name} onClick={() => selectTarget(name)}>
                <input
                  readOnly
                  autoComplete="off"
                  placeholder={`${i + 1}. 출발지를 입력해주세요`}
                  {...register(name, { required: "주소를 입력해주세요!" })}
                />
                {source.length > 2 && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteInputHandler(name, id);
                    }}
                  >
                    <Delete className="sm" />
                  </div>
                )}
              </FormInner>
            );
          })}
          <AddBtn onClick={addInputHandler}>
            <div>
              <Plus className="sm" />
            </div>
            <div>장소 추가</div>
          </AddBtn>

          <Btn>중간 장소 확인</Btn>
        </FormArea>
      </PageField>

      <SearchModal toggle={toggle} selectLocation={selectLocation} selectTarget={selectTarget} />
      <ViewMiddleModal locationList={locationList} viewToggle={viewToggle} setViewToggle={setViewToggle} />
    </Modal>
  );
};

export default memo(GetMiddleModal);

const FormArea = styled.form`
  & > * {
    margin-bottom: 0.8rem;
  }
  .error {
  }
`;

const FormInner = styled(TextField)`
  & > :nth-child(2) {
    color: ${(props) => props.theme.color.black.light};
  }
`;

const AddBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1.6rem 0.8rem;

  color: ${(props) => props.theme.color.brand};
  font-size: 1.4rem;
  font-weight: bold;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > :first-child {
    margin-right: 0.8rem;
  }
`;
