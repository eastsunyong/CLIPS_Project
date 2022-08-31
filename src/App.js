import React from "react";

import Router from "shared/Router";
import Layout from "components/common/mobileLayout/Layout";
import Main from "components/common/mobileLayout/Main";
import Footer from "components/common/mobileLayout/Footer";

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
