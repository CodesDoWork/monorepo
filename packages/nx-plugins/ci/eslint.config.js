const baseConfig = require("../../../eslint.config.js").default;

module.exports = [
    ...baseConfig,
    {
        ignores: ["!**/*", "eslint.config.js"],
    },
];
