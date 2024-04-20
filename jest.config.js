module.exports = {
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)', 
    '<rootDir>/src/**/(*.)ts',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};