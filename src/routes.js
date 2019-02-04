import React, { Fragment } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LazyImport from "components/lazyimport";
import { Layout } from "antd";

const { Header, Content } = Layout;

const Nav = LazyImport(() =>
  import("components/header" /* webpackChunkName: 'nav' */)
);

const Home = LazyImport(() =>
  import("pages/home" /* webpackChunkName: 'home' */)
);

const Page404 = LazyImport(() =>
  import("pages/notFound" /* webpackChunkName: 'notfound' */)
);

const Routes = () => (
  <Router>
    <Fragment>
      <Layout className="layout">
        <Header>
          <Nav />
        </Header>
        <Content>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={Page404} />
          </Switch>
        </Content>
      </Layout>
    </Fragment>
  </Router>
);

export default Routes;
