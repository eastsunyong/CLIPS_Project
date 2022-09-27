import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";

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
    <Chip size="sm" selected={selected} onClick={clickHandler}>
      {category}
    </Chip>
  );
};

export default memo(CategoryChip);
