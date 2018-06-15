import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Map from '../../components/map/Map';
import { fetchPlaces, fetchPlacesToShow } from '../../reducers/places';
import { showContentAction } from '../../reducers/content';
import { Place } from '../../models/places';
import classes from './Home.css';
import classnames from 'classnames';
import deepEqual from 'deep-equal';

class Home extends React.Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.shape(Place)),

    className: PropTypes.string.isRequired,
    contentHidden: PropTypes.bool.isRequired,
    getPlaces: PropTypes.func,
    showArticles: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      toggle: props.map.toggle,
      center: props.map.center,
    };
    this.props.getPlaces();
    this.showArticles = this.showArticles.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if (!deepEqual(props.map.toggle, state.toggle)) {
      newState['toggle'] = props.map.toggle;
    }
    if (!deepEqual(props.map.center, state.center)) {
      newState['center'] = props.map.center;
    }
    return newState;
  }

  showArticles(articleIds) {
    this.props.showArticles(articleIds);
  }

  componentDidUpdate(prevProps) {
    if (this.map) {
      if (!deepEqual(prevProps.map.toggle, this.state.toggle)) {
        this.map.toggleMarkerById(this.props.map.toggle.id);
      }
      if (!deepEqual(prevProps.map.center, this.state.center)) {
        this.map.centerMap(this.props.map.center.latLng);
      }
    }
  }

  render() {
    const { className, places, contentHidden } = this.props;

    return (
      <div className={className}>
        <Map className={classnames(classes.map, {[classes.mapToContent]: !contentHidden})}
             places={places}
             onRef={ref => (this.map = ref)}
             showArticles={this.showArticles} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.list,
  contentHidden: state.content.hidden,
  map: state.map
});

const mapDispatchToProps = dispatch => ({
  getPlaces: () => dispatch(fetchPlaces()),
  showArticles: payload => dispatch([
    showContentAction(),
    fetchPlacesToShow(payload)
  ]),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
