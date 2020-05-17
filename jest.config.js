module.exports = {
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.svelte$': 'svelte-jester',
    },
    moduleFileExtensions: ["js", "svelte"],
    transformIgnorePatterns: [],
    bail: false,
    verbose: true,
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};