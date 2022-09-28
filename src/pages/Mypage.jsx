import React from "react";
import { useSelector } from "react-redux";

import { User } from "components/page/myPage";
import { RandingPage } from ".";

const MyPage = () => {
  const isLoading = useSelector((state) => state.review.isLoading);

  return (
    <>
    {isLoading && <RandingPage />}
      <User />
    </>
  );
};

export default MyPage;
