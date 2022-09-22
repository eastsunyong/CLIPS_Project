import React, { useState } from "react";
import styled from "styled-components";

import { ToggleReview, WriteList, WriteReview, ReviewList } from "components/page/review";

const Review = () => {
  const [selected, setSelected] = useState(true);
  const [writeToggle, setWriteToggle] = useState({ promise: null, toggle: false });

  return (
    <>
      <Section>
        <ToggleReview selected={selected} setSelected={setSelected} />
        {selected ? <WriteList writeToggle={writeToggle} setWriteToggle={setWriteToggle} /> : <ReviewList />}
      </Section>
      <WriteReview writeToggle={writeToggle} setWriteToggle={setWriteToggle} />
    </>
  );
};

export default Review;

const Section = styled.section`
  display: flex;
  flex-flow: column;

  height: 100%;
  padding-top: calc(${(props) => props.theme.size.xs} * 2);
`;
