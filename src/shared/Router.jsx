import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Login } from "pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
