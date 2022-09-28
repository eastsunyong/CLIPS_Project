import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { PromiseList, AddPromise } from "components/page/promise";
import DetailPromise from "../components/page/promise/DetailPromise";
import { RandingPage } from ".";

const Promised = () => {
  const location = useLocation();
  const addData = useSelector((state) => state.promise.addData);
  const isLoading = useSelector((state) => state.review.isLoading);

  const [addToggle, setAddToggle] = useState(false);

  useEffect(() => {
    if (!addData.place.name) {
      location.state = null;
    }
    if (location.state && addData.place.name) {
      setAddToggle(location.state.setAddress);
    }
  }, []);

  return (
    <>
      {isLoading && <RandingPage />}
      <PromiseList setAddToggle={setAddToggle} />
      <AddPromise addData={addData} addToggle={addToggle} setAddToggle={setAddToggle} />
      <DetailPromise />
    </>
  );
};

export default Promised;
