import React, { memo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import _ from "lodash";

import CategoryChip from "./CategoryChip";
import { useXDrag } from "hooks";

const CategoryList = ({ className }) => {
  const list = useSelector((state) => state.main.categoryList);
  const [ref, start, end, moving] = useXDrag();

  return (
    <Container className={className} ref={ref} onMouseDown={start} onMouseMove={_.throttle(moving, 50)} onMouseUp={end} onMouseLeave={end}>
      {list.map((category) => {
        return <CategoryChip key={category} category={category} />;
      })}
    </Container>
  );
};

export default memo(CategoryList);

const Container = styled.div`
  position: relative;
  display: flex;
  overflow: scroll;

  z-index: ${(props) => props.theme.level.front.low};

  padding: 1.2rem 1.6rem;
  & > *:not(:last-child) {
    margin-right: 0.8rem;
  }
`;
