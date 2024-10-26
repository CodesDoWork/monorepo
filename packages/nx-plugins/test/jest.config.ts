export default {
    displayName: "@codesdowork/nx-plugins-test",
    preset: "../../../jest.preset.js",
    transform: {
        "^.+\\.[tj]s$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }],
    },
    moduleFileExtensions: ["ts", "js", "html"],
    coverageDirectory: "../../../coverage/packages/nx-plugins/test",
};
