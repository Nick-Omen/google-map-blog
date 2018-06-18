import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Place } from '../../models/places';
import { centerMapAction, toggleMapMarkerAction } from '../../reducers/map';
import { openPlaceDetails } from '../../reducers/places';
import { PlacesList, Controls } from '../../components/places';
import classes from './List.css';
import { push } from 'react-router-redux';

class List extends React.Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.shape(Place)),
    placesToShow: PropTypes.arrayOf(PropTypes.shape(Place)),
    centerMapOnMarker: PropTypes.func.isRequired,
  };

  centerMap(latLng, marker) {
    this.props.centerMapOnMarker(latLng, marker);
  }

  toArticleDetails(slug) {
    this.props.pushToArticleDetails(slug);
  }

  render() {
    const { placesToShow, places } = this.props;
    const p = placesToShow.length > 0 ? placesToShow : places;

    return (
      <div className={classes.list}>
        <Controls className={classes.listControls} />

        <PlacesList places={p} centerMap={this.centerMap.bind(this)}
                    toArticleDetails={this.toArticleDetails.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.list,
  placesToShow: state.places.listToShow
});

const mapDispatchToProps = dispatch => ({
  centerMapOnMarker: (latLng, marker) => dispatch([
    centerMapAction(latLng),
    toggleMapMarkerAction(marker)
  ]),
  pushToArticleDetails: payload => dispatch(push(`/article/${payload}/`))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
