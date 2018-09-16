const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';

module.exports = {
    testEnvironment: 'jest-environment-jsdom-global',
    setupFiles: ['<rootDir>/jest.setup.js'],
    testRegex: TEST_REGEX,
    transform: {
        '^.+\\.tsx?$': 'babel-jest'
    },
    testPathIgnorePatterns: [
        '<rootDir>/.next/', '<rootDir>/node_modules/'
    ],
    moduleFileExtensions: [
        'ts', 'tsx', 'js', 'jsx'
    ],
    moduleDirectories: ["node_modules"],

    collectCoverage: true,

    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        "!**/*.spec.js",
        "!**/*.test.js",
        '!ld-json.js',
        '!app.js',
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "jest.setup.js",
        "jest.config.js",
        "next.config.js",
        "/coverage/"
    ]
}
