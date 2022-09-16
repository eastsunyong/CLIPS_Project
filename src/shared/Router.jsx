import React from "react";
import { Routes, Route } from "react-router-dom";

import { Main, Login, Promised, DetailPromise, MyPage } from "pages";
import { useSelector } from "react-redux";

const Router = () => {
  const isLogin = useSelector((state) => state.LOGIN.login);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/myPage" element={isLogin ? <MyPage /> : <Login />} />
      <Route path="/Promised" element={isLogin ? <Promised /> : <Login />} />
      <Route path="/Promise/:promiseId" element={isLogin ? <DetailPromise /> : <Login />} />
    </Routes>
  );
};

export default Router;
