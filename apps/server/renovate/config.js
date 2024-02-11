const { GIT_URL } = process.env;

module.exports = {
    platform: "gitlab",
    gitUrl: "endpoint",
    endpoint: `${GIT_URL}/api/v4/`,
    autodiscover: true,
    onboarding: true,
    onboardingConfig: {
        extends: ["config:recommended"],
    },
    rangeStrategy: "bump",
    packageRules: [
        {
            matchUpdateTypes: ["minor", "patch", "pin", "digest"],
            automerge: true,
        },
        {
            matchDepTypes: ["devDependencies"],
            automerge: true,
        },
    ],
};
