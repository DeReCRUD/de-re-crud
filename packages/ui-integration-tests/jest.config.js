const baseConfig = require('../../jest.config.base');

module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '@de-re-crud/(.*)': '<rootDir>/../../packages/$1/src',
  },
};
