// Here we specify that Jest will use ts-jest to run tests.
// We also specify the module paths use the src directory
// as a content root. This is the same as in tsconfig.json,
// but we could optionally do this setup to have jest import
// the actual paths defined in tsconfig.json, but there are
// some difficulties with getting the path matching to work:
// See: https://github.com/kulshekhar/ts-jest/issues/269#issuecomment-608245812

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ["<rootDir>/src/"],
}