import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";

import { Layout, Main, Footer } from "components/mobileLayout";
import { RandingPage } from "pages";
import { isLogin } from "store/modules/loginSlice";

function App() {
  const Router = lazy(() => import("shared/Router"));

  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) dispatch(isLogin(true));
  }, []);

  return (
    <Layout>
      <Suspense fallback={<RandingPage />}>
        <Main>
          <Router />
        </Main>
        <Footer />
      </Suspense>
    </Layout>
  );
}

export default App;
