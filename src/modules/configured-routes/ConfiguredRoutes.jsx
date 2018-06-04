import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import Home from '../../modules/home';
import AuthRedirect from './AuthRedirect'

const routeConfigs = [
  {
    path: '/',
    pageTitle: 'Explore my world',
    exact: true,
    component: Home,
    requiresLogin: false,
  },
];

const browserHistory = createHistory();

export default class ConfiguredRoutes extends React.Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Switch>
          {
            routeConfigs.map(routeConfig => (
              <AuthRedirect
                key={routeConfig.path}
                {...this.props}
                {...routeConfig}
              />
            ))
          }
          <Redirect to="/404" />
        </Switch>
      </Router>

    );
  }
}