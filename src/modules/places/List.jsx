import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Place } from '../../models/places';

const PlaceItem = props => (
  <li>
    {props.title}
  </li>
);

const PlacesList = props => (
  <ul>
    {props.places.map(p => <PlaceItem key={p.id} {...p} />)}
  </ul>
);

class List extends React.Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.shape(Place)),
    placesToShow: PropTypes.arrayOf(PropTypes.shape(Place)),
  };

  render() {
    const { placesToShow, places } = this.props;

    if (placesToShow.length > 0) {
      return <PlacesList places={placesToShow} />;
    }

    return (
      <PlacesList places={places} />
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.list,
  placesToShow: state.places.listToShow
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(List);
