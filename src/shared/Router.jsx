import React from "react";
import { Routes, Route } from "react-router-dom";

import { Main, Login, SignUp, MyPage } from "pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/myPage" element={<MyPage />} />
    </Routes>
  );
};

export default Router;
