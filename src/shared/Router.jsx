import React from "react";
import { Routes, Route } from "react-router-dom";

import { Main, Logins, Promised, DetailPromise, MyPage } from "pages";

const Router = () => {
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/myPage" element={accessToken ? <MyPage /> : <Logins />} />
      <Route path="/Promised" element={<Promised />} />
      <Route path="/Promise/:promiseId" element={<DetailPromise />} />
    </Routes>
  );
};

export default Router;
