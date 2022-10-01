import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { Main, Login, Promised, Mypage, Review, KakaoLogin, Helper } from "pages";

const Router = () => {
  const userId = useSelector((state) => state.login.userId);
  return (
    <>
      {/* <Helper /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/promised" element={userId ? <Promised /> : <Login />} />
        <Route path="/review" element={userId ? <Review /> : <Login />} />
        <Route path="/myPage" element={userId ? <Mypage /> : <Login />} />
        <Route path="/kakao" element={<KakaoLogin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Router;
