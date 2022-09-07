import React, { memo } from "react";
import styled from "styled-components";

import { MoveTopModal } from "components/common/modal";
import { Btn } from "components/common";
import { GeoIcon, PinIcon } from "assets/icons";

const MarkerDetailModal = (props) => {
  return (
    <MoveTopModal toggle={true} viewSlice={false}>
      <SectionBottom className="fcc">
        <GetMiddleBtn
          onClick={() => {
            props.setLeftToggle(true);
          }}
        >
          <PinIcon />
          <span>중간은 어디?</span>
        </GetMiddleBtn>
        <BottomBtn
          onClick={() => {
            props.setCenter(true);
          }}
        >
          <GeoIcon />
        </BottomBtn>
      </SectionBottom>

      <MarkerInfo></MarkerInfo>
    </MoveTopModal>
  );
};

export default memo(MarkerDetailModal);

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
