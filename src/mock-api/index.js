export default options => {
  switch (options.url) {
    default:
      if (/^\/country\/\w+\//g.test(options.url)) {
        return {
          data: {
            area: 100000,
            population: 170000,
            places_visited: 10,
            articles: 3
          },
          message: ''
        };
      }
      return {
        data: {},
        message: ''
      };
  }
};
