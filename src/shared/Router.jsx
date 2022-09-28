import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Main, Login, Promised, Mypage, Review, KakaoLogin } from "pages";
import { useSelector } from "react-redux";

const Router = () => {
  const userId = useSelector((state) => state.login.userId);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/promised" element={userId ? <Promised /> : <Login />} />
      <Route path="/review" element={userId ? <Review /> : <Login />} />
      <Route path="/myPage" element={userId ? <Mypage /> : <Login />} />
      <Route path="/kakao" element={<KakaoLogin />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
