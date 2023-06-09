const { GIT_CONTAINER, GIT_PORT } = process.env;

module.exports = {
    autodiscover: true,
    endpoint: `http://${GIT_CONTAINER}:${GIT_PORT}/api/v1/`,
    gitUrl: "endpoint",
    onboarding: true,
    onboardingConfig: {
        extends: ["config:base"],
    },
    platform: "gitea",
};
