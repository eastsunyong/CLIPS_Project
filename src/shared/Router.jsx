import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Logins } from "pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Logins />} />
    </Routes>
  );
};

export default Router;
