import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Chip } from "components/common";
import { setSelectedCg } from "store/modules/mainSlice";

const CategoryChip = ({ category }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);

  // 카테고리 클릭 이벤트
  const clickHandler = () => {
    dispatch(setSelectedCg(category));
    setSelected(!selected);
  };

  return (
    <CustomChip size="sm" selected={category === "음식점" ? !selected : selected} onClick={clickHandler}>
      {category}
    </CustomChip>
  );
};

export default memo(CategoryChip);

const CustomChip = styled(Chip)`
  flex: 1;
  border-radius: 0.4rem;
`;
