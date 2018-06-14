import React from 'react';
import PropTypes from 'prop-types';
import classes from './Map.css';
import MapLib from './map-lib';
import classnames from 'classnames';
import { GOOGLE_MAP_API_KEY } from '../../const';
import { Place } from '../../models/places';
import article from './assets/article.svg';
import photo from './assets/photo.svg';

const map = new MapLib();
const GET_IMAGE_PATH = {
  'photo': () => photo,
  'article': () => article,
};

window['initMap'] = () => {
  map.init();
};

export default class Map extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    places: PropTypes.arrayOf(PropTypes.shape(Place)),

    showArticles: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      mapLoaded: false,
      placesDrawn: false
    };

    this.onMapLoaded = this.onMapLoaded.bind(this);
    this.initializeMap = this.initializeMap.bind(this);

    map.onInit = this.onMapLoaded.bind(this);
    map.visibleMarkersChanged = this.visibleMarkersChanged.bind(this);

    Map.loadMap();
  }

  static loadMap() {
    const src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&callback=initMap`;
    const script = document.createElement('script');
    document.body.appendChild(script);
    script.src = src;
  }

  static drawPlaces(places) {
    if (map.isInitialized() && places && places.length > 0) {
      map.drawMarkers(places.map(p => ({
        id: p.id,
        latLng: {
          lat: p.latitude,
          lng: p.longitude
        },
        iconPath: GET_IMAGE_PATH[p.type]()
      })));
      return true;
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
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
    this.props.showArticles(markers.map(m => m.id));
  }

  initializeMap() {
    map.render(this.refs['map']);
    Map.drawPlaces(this.props.places);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.mapLoaded !== this.state.mapLoaded;
  }

  render() {
    const { className } = this.props;
    const { mapLoaded } = this.state;

    if (!mapLoaded) {
      return <span>loading...</span>;
    }

    return (
      <div className={classnames(classes.map, className)} ref="map">Map</div>
    );
  }
}
