module.exports = {
  projects: ['<rootDir>/packages'],
  resetMocks: true,
  testURL: 'http://localhost',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '(/__tests__/.*\\.(test|spec))\\.(js|jsx|ts|tsx)?$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  globals: {
    'ts-jest': {
      tsConfig: {
        experimentalDecorators: true,
      },
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'packages/**/*.{ts,js}',
    '!packages/**/rollup*',
    '!packages/**/*.d.ts',
    '!packages/storybook/**/*',
  ],
};
