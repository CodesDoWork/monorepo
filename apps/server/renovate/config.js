const { GIT_URL } = process.env;

module.exports = {
    autodiscover: true,
    endpoint: `${GIT_URL}/api/v4/`,
    gitUrl: "endpoint",
    onboarding: true,
    onboardingConfig: {
        extends: ["config:recommended"],
    },
    platform: "gitlab",
};
