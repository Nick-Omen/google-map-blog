import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import AuthRedirect from './AuthRedirect'
import { PlacesList, PlacesDetails } from '../places'

const routeConfigs = [
  {
    path: '/',
    pageTitle: 'Explore my world',
    exact: true,
    component: PlacesList,
    requiresLogin: false,
  },
  {
    path: '/article/:key/',
    pageTitle: 'Explore my world',
    exact: true,
    component: PlacesDetails,
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