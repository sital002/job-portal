/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testTimeout: 30000,
  testMatch: ["**/?(*.)+(spec|test).ts"],
  detectOpenHandles: true,
};
