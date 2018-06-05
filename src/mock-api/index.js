import placesData from './places-data';

export default options => {
  switch (options.url) {
    case '/places/':
      return placesData;
    default:
      return {
        data: {},
        message: ''
      };
  }
};
