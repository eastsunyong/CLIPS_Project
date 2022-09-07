import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { MoveTopModal } from "components/common/modal";
import { Btn } from "components/common";
import { GeoIcon, PinIcon } from "assets/icons";
import { toggleViewMiddle } from "store/modules/homeSlice";
import { _createLatLon } from "store/modules/mapSlice";

const MarkerDetailModal = () => {
  const dispatch = useDispatch();
  const map = useSelector((state) => state.map.map);
  const coord = useSelector((state) => state.map.coord);

  return (
    <MoveTopModal toggle={false} viewSlice={false}>
      <SectionBottom className="fcc">
        <GetMiddleBtn
          onClick={() => {
            dispatch(toggleViewMiddle());
          }}
        >
          <PinIcon />
          <span>중간은 어디?</span>
        </GetMiddleBtn>
        <BottomBtn
          onClick={() => {
            map.panTo(_createLatLon(coord.x, coord.y));
          }}
        >
          <GeoIcon />
        </BottomBtn>
      </SectionBottom>

      <MarkerInfo></MarkerInfo>
    </MoveTopModal>
  );
};

export default MarkerDetailModal;

const SectionBottom = styled.div`
  height: calc(${(props) => props.theme.size.m} * 2);
  padding: ${(props) => props.theme.size.s} calc(${(props) => props.theme.size.s} * 2);
  justify-content: space-between !important;
`;

const BottomBtn = styled(Btn)`
  font-size: ${(props) => props.theme.fontSize.s};
  font-weight: bold;

  padding: ${(props) => props.theme.size.s};
  border-radius: ${(props) => props.theme.size.m};

  & > :first-child {
    width: ${(props) => props.theme.fontSize.s};
    height: ${(props) => props.theme.fontSize.s};
  }
`;

const GetMiddleBtn = styled(BottomBtn)`
  background: ${(props) => props.theme.themeColor};
  & > :first-child {
    margin-right: calc(${(props) => props.theme.size.s} / 2);
  }
  & > * {
    filter: invert(100%);
  }
`;

const MarkerInfo = styled.div`
  position: relative;
  height: 10rem;
  background: white;
  border-radius: ${(props) => props.theme.size.m} ${(props) => props.theme.size.m} 0 0;
  box-shadow: 0px -4px 10px rgba(17, 24, 39, 0.15);
`;
