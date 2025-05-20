module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    
    testTimeout: 30000, // Set a longer timeout (30 seconds)
    
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transform JavaScript and JSX files using Babel
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    },
    moduleFileExtensions: ['js', 'jsx'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Path to the setup file
   };