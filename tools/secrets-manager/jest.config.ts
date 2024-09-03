/* eslint-disable */
export default {
    displayName: "secrets-manager",
    preset: "../../jest.preset.js",
    transform: {
        "^.+\\.[tj]s$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }],
    },
    moduleFileExtensions: ["ts", "js", "html"],
    coverageDirectory: "../../coverage/tools/secrets-manager",
};
