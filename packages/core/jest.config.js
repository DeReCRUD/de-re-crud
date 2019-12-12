const baseConfig = require('../../jest.config.base');

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '@de-re-crud/(.*)': '$1/src',
  },
};
