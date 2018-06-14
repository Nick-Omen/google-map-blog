import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Map from '../../components/map/Map';
import { fetchPlaces, fetchPlacesToShow } from '../../reducers/places';
import { showContentAction } from '../../reducers/content';
import { Place } from '../../models/places';
import classes from './Home.css';
import classnames from 'classnames';

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

    this.props.getPlaces();
    this.showArticles = this.showArticles.bind(this);
  }

  showArticles(articleIds) {
    console.log(articleIds);
    this.props.showArticles(articleIds);
  }

  render() {
    const { className, places, contentHidden } = this.props;

    return (
      <div className={className}>
        <Map className={classnames(classes.map, {[classes.mapToContent]: !contentHidden})} places={places} showArticles={this.showArticles} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.list,
  contentHidden: state.content.hidden,
});

const mapDispatchToProps = dispatch => ({
  getPlaces: () => dispatch(fetchPlaces()),
  showArticles: payload => dispatch([
    showContentAction(),
    fetchPlacesToShow(payload)
  ]),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
