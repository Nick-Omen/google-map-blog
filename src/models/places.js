import PropTypes from 'prop-types';

export const Place = {
  id: PropTypes.number,
  type: PropTypes.oneOf([
    'photo', 'article'
  ]),
  title: PropTypes.string,
  description_short: PropTypes.string,
  thumbnail: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};
