import { MarkerClusterer } from './marker-cluster';
import article from './assets/pin.svg';
import photo from './assets/pin.svg';

/* global google */

const GET_IMAGE_PATH = {
  'photo': () => photo,
  'article': () => article,
};

const MAP_ZOOM_TIMEOUT = 250;

MarkerClusterer.IMAGE_PATH = process.env.PUBLIC_URL + 'cluster-images/m';

const getPlaceInfoWindowContent = place => {
  let content = '<div style="width: 280px">';
  if (place.thumbnail) {
    content += '<div style="width: 280px; height: 210px; margin-bottom: 10px; ';
    content += `background: url(${place.thumbnail}) center/contain no-repeat;"></div>`;
  }
  content += place.title;
  content += '</div>';

  return content;
};

export default class MapLib {
  onInit = () => {
  };
  visibleMarkersChanged = () => {
  };
  mapNode = null;
  map = null;
  clusters = null;
  infoWindow = null;
  mapWidth = 0;
  mapHeight = 0;
  markers = [];

  init() {
    this.onInit();
  }

  setMapWidth(width) {
    this.mapWidth = width;
  }

  setMapHeight(height) {
    this.mapHeight = height;
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
    google.maps.event.addListener(this.map, 'zoom_changed', this._visibleMarkersChanged.bind(this));
  }

  _enableDragEndListener() {
    google.maps.event.addListener(this.map, 'dragend', this._visibleMarkersChanged.bind(this));
  }

  _visibleMarkersChanged() {
    const mapBounds = this.map.getBounds();
    const markers = this.markers.filter(m => mapBounds.contains(m.getPosition()));
    this.visibleMarkersChanged(markers);
  }

  _getZoomByBounds(bounds) {
    const MAX_ZOOM = this.map.mapTypes.get(this.map.getMapTypeId()).maxZoom || 21;
    const MIN_ZOOM = this.map.mapTypes.get(this.map.getMapTypeId()).minZoom || 0;

    const ne = this.map.getProjection().fromLatLngToPoint(bounds.getNorthEast());
    const sw = this.map.getProjection().fromLatLngToPoint(bounds.getSouthWest());

    const worldCoordWidth = Math.abs(ne.x - sw.x);
    const worldCoordHeight = Math.abs(ne.y - sw.y);

    //Fit padding in pixels
    const FIT_PAD = 40;

    for (let zoom = MAX_ZOOM; zoom >= MIN_ZOOM; --zoom) {
      if (worldCoordWidth * (1 << zoom) + 2 * FIT_PAD < this.mapWidth &&
        worldCoordHeight * (1 << zoom) + 2 * FIT_PAD < this.mapHeight)
        return zoom;
    }
    return 0;
  }

  _getMarkersLatLngBounds(markers) {
    const latLngBounds = new google.maps.LatLngBounds();
    markers.forEach(m => latLngBounds.extend(m.getPosition()));
    return latLngBounds;
  }

  _fitToMarkers(markers = null) {
    if (!markers) {
      markers = this.markers;
    }
    this.map.fitBounds(this._getMarkersLatLngBounds(markers));
  }

  _smoothZoom(newZoom, cb) {
    const currentZoom = this.map.getZoom();

    if (newZoom > currentZoom) {
      let i = 1;
      let steps = Math.round(Math.abs((currentZoom + 2 - newZoom)) / 2);

      for (let z = currentZoom + 2; z <= newZoom; z += 2) {
        const k = i;
        setTimeout(() => {
          this.map.setZoom(z);
          if (k >= steps) {
            setTimeout(() => {
              cb();
            }, MAP_ZOOM_TIMEOUT);
          }
        }, MAP_ZOOM_TIMEOUT * i);
        i++;
      }
    } else {
      cb();
    }
  }

  _onClusterClick(c) {
    const markers = c.getMarkers();
    const newBounds = this._getMarkersLatLngBounds(markers);
    const newCenter = newBounds.getCenter();

    this.map.panTo(newCenter);
    this._smoothZoom(this._getZoomByBounds(newBounds), () => {
      this.map.fitBounds(newBounds);
    });
  }

  _openInfoWindow(marker) {
    this.infoWindow = new google.maps.InfoWindow({
      content: getPlaceInfoWindowContent(marker.data)
    });
    this.infoWindow.open(this.map, marker);
  }

  _closeInfoWindow() {
    if (this.infoWindow) {
      this.infoWindow.close();
      this.infoWindow = null;
    }
  }

  _onMarkerClick(marker, e) {
    this._closeInfoWindow();
    this.visibleMarkersChanged([marker]);
    this._openInfoWindow(marker);
    this.center(e.latLng);
  }

  zoom(zoom) {
    this.map.setZoom(zoom);
  }

  center(latLng) {
    this.map.setCenter(latLng);
  }

  toggleMarkerById(id) {
    const marker = this.markers.find(m => m.data.id === id);
    if (marker) {
      this.zoom(15);
      marker.setAnimation(google.maps.Animation.BOUNCE);
      this.visibleMarkersChanged([marker]);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 2100); // Bounce 3 times
    }
  }

  drawMarkers(markers) {
    if (this.map === null) {
      throw new Error('Map is not initialized.');
    }

    markers.forEach(m => {
      const icon = new google.maps.MarkerImage(
        GET_IMAGE_PATH[m.type](),
        new google.maps.Size(50, 50),
        new google.maps.Point(0, 0),
        new google.maps.Point(50, 50),
        new google.maps.Size(50, 50));
      const marker = new google.maps.Marker({
        position: {
          lat: m.latitude,
          lng: m.longitude
        },
        map: this.map,
        title: m.title,
        data: m,
        icon: icon
      });
      this.markers.push(marker);
      marker.addListener('click', this._onMarkerClick.bind(this, marker));
    });
    this.clusters = new MarkerClusterer(this.map, this.markers, {
      zoomOnClick: false
    });
    google.maps.event.addListener(this.clusters, 'click', this._onClusterClick.bind(this));
    this.clusters.fitMapToMarkers();
  }
}
