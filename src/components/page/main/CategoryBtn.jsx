import React, { useEffect, useState } from "react";

import { RoundBtn } from "components/common";
import styled from "styled-components";

import { sweetalert } from "utils";

const CategoryBtn = (props) => {
  const [selected, setSelected] = useState(false);

  const clickHandler = () => {
    if (props.category === "CLIPs Pick") {
      sweetalert.avatarAlert()
      return;
    }
    if (!props.selectedCategory.find((e) => e === props.category)) {
      props.setSelectedCategory([...props.selectedCategory, props.category]);
    } else {
      const newCategoryArr = props.selectedCategory.filter((e) => e !== props.category);
      props.setSelectedCategory(newCategoryArr);
    }
    setSelected(!selected);
  };

  useEffect(() => {
    if (props.category === "음식점") {
      setSelected(!selected);
      props.setSelectedCategory([props.category]);
    }
  }, []);

  return (
    <Btn type="small" selected={selected} onClick={clickHandler}>
      {props.category}
    </Btn>
  );
};

const Btn = styled(RoundBtn)`
  // 텍스트 드래그 방지
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

export default CategoryBtn;
