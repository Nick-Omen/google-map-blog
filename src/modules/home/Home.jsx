import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Map from '../../components/map/Map';
import { fetchPlaces } from '../../reducers/places';
import { Place } from '../../models/places';

class Home extends React.Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.shape(Place)),

    className: PropTypes.string.isRequired,
    getPlaces: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.props.getPlaces();
  }

  render() {
    const { className, places } = this.props;

    return (
      <Map className={className} places={places} />
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.list
});

const mapDispatchToProps = dispatch => ({
  getPlaces: () => dispatch(fetchPlaces())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
