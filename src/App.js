import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRoutes from './modules/configured-routes';
import reduxStore from './utils/store';
import Home from './modules/home';
import Content from './modules/content';
import classes from './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };

    this.onWindowResize = this.onWindowResize.bind(this);
    this.enableWindowListener();
  }

  onWindowResize() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }

  enableWindowListener() {
    window.addEventListener('resize', this.onWindowResize);
  }

  disableWindowListener() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    this.disableWindowListener();
  }
  render() {
    const { windowWidth, windowHeight } = this.state;

    return (
      <Provider store={reduxStore}>
        <div style={{ width: windowWidth, height: windowHeight }}>
          <Home className={classes.home} />
          <Content className={classes.content}>
            <AppRoutes />
          </Content>
        </div>
      </Provider>
    );
  }
}

export default App;
