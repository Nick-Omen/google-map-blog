import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Map from '../../components/map/Map';
import { fetchPlaces, fetchPlacesToShow, openPlaceDetails } from '../../reducers/places';
import { showContentAction } from '../../reducers/content';
import { Place } from '../../models/places';
import classes from './Home.css';
import classnames from 'classnames';
import deepEqual from 'deep-equal';
import { push } from 'react-router-redux';

class Home extends React.Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.shape(Place)),

    className: PropTypes.string.isRequired,
    windowWidth: PropTypes.number.isRequired,
    windowHeight: PropTypes.number.isRequired,
    contentHidden: PropTypes.bool,
    getPlaces: PropTypes.func,
    showArticles: PropTypes.func,
    pushToArticleDetails: PropTypes.func,
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

  showArticles(articles) {
    this.props.showArticles(articles);
  }

  componentDidUpdate(prevProps) {
    if (this.map) {
      if (!deepEqual(prevProps.map.toggle, this.state.toggle)) {
        this.map.toggleMarkerById(this.props.map.toggle.id);
        this.props.pushToArticleDetails(this.props.map.toggle.slug);
      }
      if (!deepEqual(prevProps.map.center, this.state.center)) {
        this.map.centerMap(this.props.map.center.latLng);
      }
    }
  }

  render() {
    const {
      className,
      places,
      contentHidden,
      windowWidth,
      windowHeight
    } = this.props;

    return (
      <div className={className}>
        <Map className={classnames(classes.map, {[classes.mapToContent]: !contentHidden})}
             places={places}
             mapWidth={windowWidth * 0.66}
             mapHeight={windowHeight}
             onRef={ref => (this.map = ref)}
             showArticles={this.showArticles.bind(this)} />
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
  pushToArticleDetails: payload => dispatch(push(`article/${payload}/`))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
