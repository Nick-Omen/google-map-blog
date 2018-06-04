import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRoutes from './modules/configured-routes';
import reduxStore from './utils/store';

class App extends Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <AppRoutes />
      </Provider>
    );
  }
}

export default App;
