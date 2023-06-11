/* eslint-disable */
export default {
    displayName: "server-music-downloader-scheduler",
    preset: "../../../../jest.preset.js",
    testEnvironment: "node",
    transform: {
        "^.+\\.[tj]sx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }],
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    coverageDirectory: "../../../../coverage/libs/server/music-downloader/scheduler",
};
