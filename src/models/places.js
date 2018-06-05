import PropTypes from 'prop-types';

export const Place = {
  id: PropTypes.number,
  type: PropTypes.oneOf([
    'photo', 'article'
  ]),
  title: PropTypes.string,
  short_article: PropTypes.string,
  photo: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};
