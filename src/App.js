import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Layout, Main, Footer } from "components/mobileLayout";
import Router from "shared/Router";
import { isLogin } from "store/modules/loginSlice";

function App() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) dispatch(isLogin(true));
  }, []);

  return (
    <Layout>
      <Main>
        <Router />
      </Main>
      <Footer />
    </Layout>
  );
}

export default App;
