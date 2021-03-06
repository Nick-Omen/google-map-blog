import React from 'react';
import PropTypes from 'prop-types';
import classes from './Map.css';
import MapLib from './map-lib';
import classnames from 'classnames';
import { GOOGLE_MAP_API_KEY } from '../../const';
import { Place } from '../../models/places';

const map = new MapLib();

window['initMap'] = () => {
  map.init();
};

export default class Map extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    places: PropTypes.arrayOf(PropTypes.shape(Place)),

    mapWidth: PropTypes.number.isRequired,
    mapHeight: PropTypes.number.isRequired,
    showArticles: PropTypes.func.isRequired,
    onRef: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      mapLoaded: false,
      placesIds: []
    };

    this.onMapLoaded = this.onMapLoaded.bind(this);
    this.initializeMap = this.initializeMap.bind(this);

    map.onInit = this.onMapLoaded.bind(this);
    map.visibleMarkersChanged = this.visibleMarkersChanged.bind(this);

    Map.loadMap();
    this.props.onRef(this);
  }

  static loadMap() {
    const src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&callback=initMap`;
    const script = document.createElement('script');
    document.body.appendChild(script);
    script.src = src;
  }

  static drawPlaces(places) {
    if (map.isInitialized() && places && places.length > 0) {
      map.drawMarkers(places);
      return true;
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (map.isInitialized()) {
      map.setMapWidth(nextProps.mapWidth);
      map.setMapHeight(nextProps.mapHeight);
    }
    if (prevState.placesDrawn) {
      return null;
    }

    const isDrawn = Map.drawPlaces(nextProps.places);

    if (isDrawn) {
      return {
        placesDrawn: true
      };
    }
    return null;
  }

  onMapLoaded() {
    this.setState({
      mapLoaded: true
    });
    setTimeout(this.initializeMap, 0);
  }

  visibleMarkersChanged(markers) {
    this.props.showArticles(markers.map(m => m.data));
  }

  initializeMap() {
    map.render(this.refs['map']);
    const isDrawn = Map.drawPlaces(this.props.places);

    if (isDrawn) {
      this.setState({
        placesDrawn: true
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.mapLoaded !== this.state.mapLoaded;
  }

  centerMap(latLng) {
    if (this.state.mapLoaded) {
      map.center(latLng);
    }
  }

  toggleMarkerById(id) {
    if (this.state.mapLoaded) {
      map.toggleMarkerById(id);
    }
  }

  render() {
    const { className } = this.props;
    const { mapLoaded } = this.state;

    if (!mapLoaded) {
      return <span>loading...</span>;
    }

    return (
      <div className={classnames(classes.map, className)} ref="map" />
    );
  }
}
