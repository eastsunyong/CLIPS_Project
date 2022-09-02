import React from "react";

import Router from "shared/Router";
import { Layout, Main, Footer } from "components/mobileLayout";

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
