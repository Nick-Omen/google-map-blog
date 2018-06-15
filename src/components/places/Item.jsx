import React from 'react';
import PropTypes from 'prop-types';
import classes from './Item.css';
import { Place } from '../../models/places';

export default class Item extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    centerMap: PropTypes.func.isRequired,
    ...Place
  };

  centerMap() {
    this.props.centerMap({
      lat: this.props.latitude,
      lng: this.props.longitude,
    }, this.props.id);
  }

  render() {
    const {
      className,
      thumbnail,
      title,
      description_short,
    } = this.props;

    return (
      <li className={className}>
        <article className={classes.article}>
          <div className={classes.thumbnail}
               style={{
                 backgroundImage: `url(${thumbnail
                   ? thumbnail
                   : (process.env.PUBLIC_URL + '/placeholder.png')})`
               }}>
          </div>
          <div className={classes.content}>
            <h3 className={classes.title}>
              {title}
            </h3>
            <p className={classes.description}>
              {description_short}
            </p>
            <div className={classes.footer}>
              <button onClick={this.centerMap.bind(this)} className={classes.button}>
                show on map
              </button>
            </div>
          </div>
        </article>
      </li>
    )
  }
}