import React, { useEffect, useState } from "react";

import { localAPI, reviewAPI } from "apis";
import styled from "styled-components";

const ReviewList = () => {
  const [list, setList] = useState([]);

  const getPromise = async () => {
    // const answer = await reviewAPI.getList();
    // for (let p of answer.list) {
    //   const res = await localAPI.addressTransfer(p.y, p.x);
    //   if (!res.docs.length) continue;
    //   const docInfo = res.docs[0]?.address ? res.docs[0]?.address : res.docs[0]?.road_address;
    //   p.place = docInfo.address_name;
    // }
    // setList(answer.list);
  };

  useEffect(() => {
    getPromise();
  }, []);
  return <Article>{list.map((review) => {})}</Article>;
};

export default ReviewList;

const Article = styled.article`
  flex: 1;
  overflow: scroll;

  padding: ${(props) => props.theme.size.m};

  &::-webkit-scrollbar {
    display: none;
  }
`;
