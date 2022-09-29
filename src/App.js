import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserView, MobileView } from "react-device-detect";

import { Web, Mobile, Main, Footer } from "components/Layout";
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
    <>
      <BrowserView>
        <Web>
          <Suspense fallback={<RandingPage />}>
            {(promiseLoading || reviewLoading) && <RandingPage />}
            <Main>
              <Router />
            </Main>
            <Footer />
          </Suspense>
        </Web>
      </BrowserView>

      <MobileView>
        <Mobile>
          <Suspense fallback={<RandingPage />}>
            {(promiseLoading || reviewLoading) && <RandingPage />}
            <Main>
              <Router />
            </Main>
            <Footer />
          </Suspense>
        </Mobile>
      </MobileView>
    </>
  );
}
export default App;
