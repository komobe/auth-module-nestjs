module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/libs/flexica/tsconfig.lib.json' }],
    },
    testMatch: ['<rootDir>/libs/flexica/tests/**/*.ts'],
    moduleNameMapper: {
        '^@komobe/flexica/(.*)$': '<rootDir>/libs/flexica/src/$1',
    },
};