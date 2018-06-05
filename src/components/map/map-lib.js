import './marker-cluster';

/* global google, MarkerClusterer */

export default class MapLib {
  onInit = () => {
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
  }

  fitToMarkers() {
    const latLngBounds = new google.maps.LatLngBounds();
    this.markers.forEach(m => latLngBounds.extend(m.getPosition()));
    this.map.fitBounds(latLngBounds);
  }

  drawMarkers(markers) {
    if (this.map === null) {
      throw new Error('Map is not initialized.');
    }
    markers.forEach(m => {
      this.markers.push(new google.maps.Marker({
        position: m.latLng,
        map: this.map,
        title: 'Hello World!'
      }));
    });
    this.clusters = new MarkerClusterer(this.map, this.markers,
      { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

    this.fitToMarkers();
  }
}
