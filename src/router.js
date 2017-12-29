import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import PropTypes from 'prop-types';
import CirclesLoading from './components/common/CirclesLoading';
// import App from './routes/App';
import { navigation } from './common/nav';
dynamic.setDefaultLoadingComponent(() => {
  return <CirclesLoading />;
});

function RouterConfig({ history, app }) {
  const navData = navigation(app);
  const passProps = {
    app,
    navData,
  };
  const routes = Object.keys(navData).map((item) => {
    const { path, component, exact } = navData[item];
    const Comp = component;
    return (<Route key={path} exact={exact} path={path} render={(props) => <Comp {...props} {...passProps} />} />);
  });
  return (
    <Router history={history}>
      <Switch>
        {/*<Redirect exact from='/' to='/clientCenter/clientList'/>*/}
        {routes}
      </Switch>
    </Router>
  );
};
RouterConfig.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};
export default RouterConfig;
