import { MarkerClusterer } from './marker-cluster';

/* global google, Cluster */

MarkerClusterer.IMAGE_PATH = process.env.PUBLIC_URL + 'cluster-images/m';

export default class MapLib {
  onInit = () => {
  };
  visibleMarkersChanged = () => {
  };
  mapNode = null;
  map = null;
  clusters = null;
  markers = [];

  init() {
    this.onInit();
  }

  isInitialized() {
    return this.map !== null;
  }

  render(node) {
    this.mapNode = node;
    this.map = new google.maps.Map(
      this.mapNode, {
        zoom: 13,
        center: {
          lat: 42.831984, lng: 74.6104193
        }
      });

    this._enableZoomListener();
    this._enableDragEndListener();
  }

  _enableZoomListener() {
    google.maps.event.addListener(this.map, 'zoom_changed', this._visibleMarkesChanged.bind(this));
  }

  _enableDragEndListener() {
    google.maps.event.addListener(this.map, 'dragend', this._visibleMarkesChanged.bind(this));
  }

  _visibleMarkesChanged() {
    const mapBounds = this.map.getBounds();
    const markers = this.markers.filter(m => mapBounds.contains(m.getPosition()));
    this.visibleMarkersChanged(markers);
  }

  _fitToMarkers(markers = null) {
    if (!markers) {
      markers = this.markers;
    }
    const latLngBounds = new google.maps.LatLngBounds();
    markers.forEach(m => latLngBounds.extend(m.getPosition()));
    this.map.fitBounds(latLngBounds);
  }

  _onClusterClick(c) {
    const markers = c.getMarkers();
    this._fitToMarkers(markers);
  }

  drawMarkers(markers) {
    if (this.map === null) {
      throw new Error('Map is not initialized.');
    }
    markers.forEach(m => {
      this.markers.push(new google.maps.Marker({
        position: m.latLng,
        map: this.map,
        id: m.id
      }));
    });
    this.clusters = new MarkerClusterer(this.map, this.markers, {
      zoomOnClick: false
    });
    google.maps.event.addListener(this.clusters, 'click', this._onClusterClick.bind(this));
    this.clusters.fitMapToMarkers();
  }
}
