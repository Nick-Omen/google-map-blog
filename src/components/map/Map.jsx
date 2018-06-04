import React from 'react';
import classes from './Map.css';
import MapLib from './map';
import { GOOGLE_MAP_API_KEY } from '../../const';

const map = new MapLib();

window['initMap'] = () => {
  map.init();
};

export default class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mapLoaded: false
    };

    this.onMapLoaded = this.onMapLoaded.bind(this);
    this.initializeMap = this.initializeMap.bind(this);

    map.onInit = this.onMapLoaded.bind(this);

    Map.loadMap();
  }

  static loadMap() {
    const src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&callback=initMap`;
    const script = document.createElement('script');
    document.body.appendChild(script);
    script.src = src;
  }

  onMapLoaded() {
    this.setState({
      mapLoaded: true
    });
    setTimeout(this.initializeMap, 0);
  }

  initializeMap() {
    map.render(this.refs['map']);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.mapLoaded !== this.state.mapLoaded;
  }

  render() {
    const { mapLoaded } = this.state;

    if (!mapLoaded) {
      return <span>loading...</span>;
    }

    return (
      <div className={classes.map} ref="map">Map</div>
    );
  }
}
