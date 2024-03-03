import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./components/pages/Routes";
import { DefaultLayout } from "~/layout";
import PrivateRoutes from "./layout/PrivateRoutes";
import { Container } from "react-bootstrap";
import PublicRoutes from "./layout/PublicRoutes";
import Layout from "./layout/layout";
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route element={<Layout />}>
            <Route element={<PrivateRoutes />}>
              {privateRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Container fluid="md">
                          <Page />
                        </Container>
                      </Layout>
                    }
                  />
                );
              })}
            </Route>
            <Route element={<PublicRoutes />}>
              {publicRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Container fluid="md">
                          <Page />
                        </Container>
                      </Layout>
                    }
                  />
                );
              })}
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;