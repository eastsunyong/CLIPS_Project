import React from "react";

import CategoryBtn from "./CategoryBtn";
import { XDragList } from "components/common";

const CategoryBtnArea = (props) => {
  return (
    <XDragList>
      <CategoryBtn category="CLIPs Pick" />
      {props?.categoryList?.map((category) => {
        return (
          <CategoryBtn key={category} category={category} selectedCategory={props.selectedCategory} setSelectedCategory={props.setSelectedCategory} />
        );
      })}
    </XDragList>
  );
};

export default CategoryBtnArea;
