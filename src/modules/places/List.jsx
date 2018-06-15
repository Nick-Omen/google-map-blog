import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Place } from '../../models/places';
import { centerMapAction, toggleMapMarkerAction } from '../../reducers/map';
import { PlacesList, Controls } from '../../components/places';
import classes from './List.css';

class List extends React.Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.shape(Place)),
    placesToShow: PropTypes.arrayOf(PropTypes.shape(Place)),
    centerMapOnMarker: PropTypes.func.isRequired,
  };

  centerMap(latLng, id) {
    this.props.centerMapOnMarker(latLng, id);
  }

  render() {
    const { placesToShow, places } = this.props;
    const p = placesToShow.length > 0 ? placesToShow : places;

    return (
      <div className={classes.list}>
        <Controls className={classes.listControls} />

        <PlacesList places={p} centerMap={this.centerMap.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.list,
  placesToShow: state.places.listToShow
});

const mapDispatchToProps = dispatch => ({
  centerMapOnMarker: (latLng, id) => dispatch([
    centerMapAction(latLng),
    toggleMapMarkerAction(id)
  ]),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
