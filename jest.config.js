module.exports = {
  projects: ['<rootDir>/packages'],
  resetMocks: true,
  testURL: 'http://localhost',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '(/__tests__/.*\\.(test|spec))\\.(js|jsx|ts|tsx)?$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'packages/**/*.{ts,js}',
    '!packages/**/rollup*',
    '!packages/**/*.d.ts',
    '!packages/storybook/**/*',
  ],
  moduleNameMapper: {
    '@de-re-crud/(.*)': '<rootDir>/packages/$1/src',
  },
};
