import React from "react";

import Router from "shared/Router";
import Layout from "components/mobileLayout/Layout";
import Main from "components/mobileLayout/Main";
import Footer from "components/mobileLayout/Footer";

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
