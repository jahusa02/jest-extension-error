module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },

  testPathIgnorePatterns: ['<rootDir>/src/test-utils/'],

  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/src/**/*.ts', '!**/src/**/index.ts', '!src/test-utils/*.ts'],

  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  reporters: ['default', 'jest-junit', 'jest-sonar'],

  globalTeardown: '<rootDir>/src/test-utils/globalTearDown.ts',
};
