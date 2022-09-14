import React from "react";
import styled from "styled-components";
import { useState } from "react";

import { PromiseList, FindFriend } from "components/page/promise";

const Promised = () => {
  const [page, setPage] = useState(0);

  return (
    <Slider page={page}>
      <PromiseList setPage={setPage} />
      <FindFriend setPage={setPage} />
    </Slider>
  );
};

const Slider = styled.div`
  position: relative;
  top: 0;
  left: calc(${(props) => props.page * -100}%);
  transition-duration: 0.8s;
  display: flex;
  height: 100%;
`;

export default Promised;
