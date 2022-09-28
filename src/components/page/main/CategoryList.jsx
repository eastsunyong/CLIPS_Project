import React, { memo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import CategoryChip from "./CategoryChip";

const CategoryList = ({ className }) => {
  const list = useSelector((state) => state.main.categoryList);

  return (
    <Container className={className}>
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

  z-index: ${(props) => props.theme.level.front.low};

  padding: 0.8rem 1.6rem;
  & > *:not(:last-child) {
    margin-right: 0.8rem;
  }
`;
