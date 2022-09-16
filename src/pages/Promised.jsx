import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { PromiseList, AddPromise } from "components/page/promise";

const Promised = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (location.state) {
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
