module.exports = {
  resetMocks: true,
  testURL: 'http://localhost',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '(/__tests__/.*\\.(test|spec))\\.(js|jsx|ts|tsx)?$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsConfig: {
        experimentalDecorators: true,
      },
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.{ts,js,tsx}', '!rollup*', '!**/*.d.ts'],
};
