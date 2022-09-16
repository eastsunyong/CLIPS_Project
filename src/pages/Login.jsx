import React, { useState } from "react";

import { Indroduce, Choice } from "components/page/login";

const Logins = () => {
  const [toggle, setToggle] = useState();
  return (
    <>
      <Indroduce setToggle={setToggle} />
      <Choice toggle={toggle} setToggle={setToggle} />
    </>
  );
};

export default Logins;
