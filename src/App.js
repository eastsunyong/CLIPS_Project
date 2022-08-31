import React from "react";

import Router from "shared/Router";
import Layout from "components/common/mobileLayout/Layout";
import Main from "components/common/mobileLayout/Main";

function App() {
  return (
    <Layout>
      <Main>
        <Router />
      </Main>
    </Layout>
  );
}

export default App;
