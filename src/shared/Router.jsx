import React from "react";
import { Routes, Route } from "react-router-dom";

import { Main, Login, Promised, DetailPromise, MyPage } from "pages";

const Router = () => {
  const accessToken = localStorage.getItem("accessToken");
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/myPage" element={accessToken ? <MyPage /> : <Login />} />
      <Route path="/Promised" element={accessToken ? <Promised /> : <Login />} />
      <Route path="/Promise/:promiseId" element={accessToken ? <DetailPromise /> : <Login />} />
    </Routes>
  );
};

export default Router;
