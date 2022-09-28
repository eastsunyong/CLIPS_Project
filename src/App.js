import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Mobile, Main, Footer } from "components/Layout";
import { RandingPage } from "pages";
import { setLogin } from "store/modules/loginSlice";

function App() {
  const Router = lazy(() => import("shared/Router"));

  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const promiseLoading = useSelector((state) => state.promise.isLoading);
  const reviewLoading = useSelector((state) => state.review.isLoading);

  useEffect(() => {
    if (accessToken) dispatch(setLogin(accessToken));
  }, []);

  return (
    <Mobile>
      <Suspense fallback={<RandingPage />}>
        {(promiseLoading || reviewLoading) && <RandingPage />}
        <Main>
          <Router />
        </Main>
        <Footer />
      </Suspense>
    </Mobile>
  );
}
export default App;
