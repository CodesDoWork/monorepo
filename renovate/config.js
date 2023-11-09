const { GIT_PORT } = process.env;

module.exports = {
    autodiscover: true,
    endpoint: `http://gitlab:${GIT_PORT}/api/v1/`,
    gitUrl: "endpoint",
    onboarding: true,
    onboardingConfig: {
        extends: ["config:base"],
    },
    platform: "gitea",
};
