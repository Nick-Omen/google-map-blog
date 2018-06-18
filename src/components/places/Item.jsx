import React from 'react';
import PropTypes from 'prop-types';
import classes from './Item.css';
import buttonClasses from '../../styles/Button.css';
import { Place } from '../../models/places';
import classnames from 'classnames';

export default class Item extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    centerMap: PropTypes.func.isRequired,
    toArticleDetails: PropTypes.func.isRequired,
    ...Place
  };

  centerMap() {
    this.props.centerMap({
      lat: this.props.latitude,
      lng: this.props.longitude,
    }, {
      id: this.props.id,
      slug: this.props.slug,
      title: this.props.title
    });
  }

  readArticle() {
    this.props.toArticleDetails(this.props.slug);
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
              <button onClick={this.centerMap.bind(this)}
                      className={classnames(buttonClasses.buttonIcon, classes.showOnMapButton)}
                      title="Show pin on the map" />
              <button onClick={this.readArticle.bind(this)}
                      className={classnames(buttonClasses.buttonIcon, classes.readArticleButton)}
                      title={`Read the article: ${title}`} />
            </div>
          </div>
        </article>
      </li>
    )
  }
}