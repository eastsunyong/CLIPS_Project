import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Main, Login, Promised, DetailPromise, Mypage, Review } from "pages";
import { useSelector } from "react-redux";

const Router = () => {
  const isLogin = useSelector((state) => state.login.login);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/myPage" element={isLogin ? <Mypage /> : <Login />} />
      <Route path="/review" element={isLogin ? <Review /> : <Login />} />
      <Route path="/promised" element={isLogin ? <Promised /> : <Login />} />
      <Route path="/promise/:promiseId" element={isLogin ? <DetailPromise /> : <Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
