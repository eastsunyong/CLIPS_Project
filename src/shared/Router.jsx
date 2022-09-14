import React from "react";
import { Routes, Route } from "react-router-dom";

import { Main, Logins, Promised, DetailPromise, Mypage } from "pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Logins />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/Promised" element={<Promised />} />
      <Route path="/Promise/:promiseId" element={<DetailPromise />} />
    </Routes>
  );
};

export default Router;
