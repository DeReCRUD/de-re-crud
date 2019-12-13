const baseConfig = require('../../jest.config.base');

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '@de-re-crud/(.*)': '<rootDir>/../../packages/$1/src',
  },
};
