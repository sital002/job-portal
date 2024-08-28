/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/?(*.)+(spec|test).ts"],
  setupFilesAfterEnv: ["./src/__tests__/setup-test.ts"],
  detectOpenHandles: true,
};
