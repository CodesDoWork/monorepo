const { GIT_URL, DOCKERHUB_USERNAME, DOCKERHUB_PASSWORD } = process.env;

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
    hostRules: [
        {
            hostType: "docker",
            matchHost: "docker.io",
            username: DOCKERHUB_USERNAME,
            password: DOCKERHUB_PASSWORD,
        },
    ],
};
