import React from 'react';
import { connect } from 'react-redux';
import Map from '../../components/map/Map';
import classes from './Home.css';

class Home extends React.Component {

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
      <div className={classes.container} style={{ width: windowWidth, height: windowHeight }}>
        <Map />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
