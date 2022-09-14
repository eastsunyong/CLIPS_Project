import React from "react";
import styled from "styled-components";

import { Modal } from "components/common";

const BottomModal = (props) => {
  return (
    <Section type="top" toggle={props.toggle} viewTitle={props.viewTitle}>
      {props.children}
    </Section>
  );
};

const Section = styled(Modal)`
  z-index: ${(props) => props.theme.level.front.low};

  top: ${(props) => {
    if (props.toggle) return "0%";

    let top = "calc(100% - 8rem ";
    top += props.viewTitle ? `- 4.6rem - ${props.theme.size.xs} * 4` : "";
    top += ")";

    return top;
  }};

  background: none;
`;

export default BottomModal;
