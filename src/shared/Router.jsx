import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Main, Login, Promised, DetailPromise, Mypage, Review } from "pages";
import { useSelector } from "react-redux";

const Router = () => {
  const userId = useSelector((state) => state.login.userId);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/myPage" element={userId ? <Mypage /> : <Login />} />
      <Route path="/review" element={userId ? <Review /> : <Login />} />
      <Route path="/promised" element={userId ? <Promised /> : <Login />} />
      <Route path="/promise/:promiseId" element={userId ? <DetailPromise /> : <Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
