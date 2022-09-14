import React from "react";

import { Layout, Main, Footer } from "components/mobileLayout";
import Router from "shared/Router";

function App() {
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
