import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import PropTypes from 'prop-types';
import App from './routes/App';
// import { Spin } from 'antd';
import CirclesLoading from './components/common/CirclesLoading';

dynamic.setDefaultLoadingComponent(() => {
  // return <div ><Spin size="large" /></div>;
  return <CirclesLoading />
});

function RouterConfig({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/Error'),
  });

  const routes = [
    {
      path: '/',
      component: () => import('./routes/ClientList'),
    }, {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/Login'),
    }
  ];
  return (
    <Router history={history}>
      <App>
        <Switch>
          {routes.map(({path, ...dynamics}, key) => (
            <Route key={key}
              exact
              path={path}
              component={dynamic({
                app,
                ...dynamics
              })}/>
          ))}
          <Route component={error} />
        </Switch>
      </App>
    </Router>
  );
}
RouterConfig.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}
export default RouterConfig;
