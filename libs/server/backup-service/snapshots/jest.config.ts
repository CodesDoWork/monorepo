/* eslint-disable */
export default {
    displayName: "server-backup-service-snapshots",
    preset: "../../../../jest.preset.js",
    testEnvironment: "node",
    transform: {
        "^.+\\.[tj]s$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }],
    },
    moduleFileExtensions: ["ts", "js", "html"],
    coverageDirectory: "../../../../coverage/libs/server/backup-service/snapshots",
};
