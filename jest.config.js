module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/libs/flexica/tsconfig.lib.json' }],
    },
    testMatch: ['<rootDir>/libs/flexica/tests/**/*.ts'],
    moduleNameMapper: {
        '^@adapters/(.*)$': '<rootDir>libs/flexica/src/adapters/$1',
        '^@contracts/(.*)$': '<rootDir>libs/flexica/src/contracts/$1',
        '^libs/flexica/src/(.*)$': '<rootDir>/libs/flexica/src/$1'
    },
};