ARG IMAGE_BASE
ARG PROJECT_VERSION

FROM ${IMAGE_BASE}/workspace-base:${PROJECT_VERSION}
WORKDIR /workspace

ENV PATH=/workspace/node_modules/.bin:${PATH}
ENV SONAR_SCANNER_SKIP_JRE_PROVISIONING=true

RUN apk add --no-cache \
    # docker
    docker docker-cli-compose \
    # dev tools
    git openssh-client zip \
    # compiler tools
    gcompat \
    # Java JRE for Sonar Scanner
    openjdk25-jre-headless \
    # Chromium for browser tests like lighthouse or e2e tests
    chromium \
    # Golang
    go

ARG NPM___AT__ANTFU__NI_VERSION=28.3.0
ARG NPM_BUN_VERSION=1.3.10
RUN npm i -g @antfu/ni@${NPM___AT__ANTFU__NI_VERSION} bun@${NPM_BUN_VERSION}
