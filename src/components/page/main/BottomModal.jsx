import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import PlaceInfo from "./PlaceInfo";
import { Chip, IconBtn, Modal } from "components/common";
import { LeftArrow, Pin, Target } from "assets/icons";
import { infoToggle, middleToggle, moveCenter } from "store/modules/mainSlice";

const BottomModal = () => {
  const dispatch = useDispatch();

  const toggle = useSelector((state) => state.main.infoView);
  const placeInfo = useSelector((state) => state.main.placeInfo);

  const [viewSize, setViewSize] = useState("7.4rem");

  // placeInfo가 있을때(마커 눌렀을 때) 뷰 조정
  useEffect(() => {
    placeInfo ? setViewSize("15.2rem") : setViewSize("7.4rem");
  }, [placeInfo, setViewSize]);

  return (
    <CustomModal type="top" toggle={toggle} viewSize={viewSize}>
      <ModalTop>
        {toggle ? (
          <IconBtn
            onClick={() => {
              dispatch(infoToggle());
            }}
          >
            <LeftArrow className="sm" />
          </IconBtn>
        ) : (
          <>
            <Chip selected={true} onClick={() => dispatch(middleToggle())}>
              <div>
                <Pin className="md" />
              </div>
              중간은 어디?
            </Chip>
            <IconBtn onClick={() => dispatch(moveCenter())}>
              <Target className="md" />
            </IconBtn>
          </>
        )}
      </ModalTop>

      <PlaceInfo placeInfo={placeInfo} />
    </CustomModal>
  );
};

export default memo(BottomModal);

const CustomModal = styled(Modal)`
  top: ${(props) => (props.toggle ? "0" : `calc(100% - ${props.viewSize})`)};
  z-index: ${(props) => props.theme.level.front.low};

  background: none;
`;

const ModalTop = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 1.6rem;
`;
