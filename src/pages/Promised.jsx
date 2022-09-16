import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { PromiseList, AddPromise } from "components/page/promise";

const Promised = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const place = useSelector((state) => state.promise.place);

  useEffect(() => {
    if (!place) {
      location.state = null;
    }
    if (location.state && place) {
      setToggle(location.state.setAddress);
    }
  }, []);

  return (
    <>
      <PromiseList setToggle={setToggle} />
      <AddPromise toggle={toggle} setToggle={setToggle} />
    </>
  );
};

export default Promised;
