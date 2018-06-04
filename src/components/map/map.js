/* global google */

export default class Map {
  onInit = () => {
  };
  mapNode = null;
  map = null;

  init() {
    this.onInit();
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
}
