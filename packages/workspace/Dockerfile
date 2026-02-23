ARG IMAGE_BASE
ARG PROJECT_VERSION

FROM ${IMAGE_BASE}/workspace-base:${PROJECT_VERSION}
WORKDIR /workspace

ENV PATH=/workspace/node_modules/.bin:${PATH}
ENV SONAR_SCANNER_SKIP_JRE_PROVISIONING=true

ARG APKEDGE_DOCKER_VERSION=29.2.1-r0
ARG APKEDGE_DOCKER_CLI_COMPOSE_VERSION=5.0.2-r1
ARG APKEDGE_GIT_VERSION=2.53.0-r0
ARG APKEDGE_OPENSSH_VERSION=10.2_p1-r0
ARG APKEDGE_GCOMPAT_VERSION=1.1.0-r4
ARG APKEDGE_OPENJDK25_JRE_HEADLESS_VERSION=25.0.2_p10-r1
ARG APKEDGE_CHROMIUM_VERSION=144.0.7559.132-r1
ARG APKEDGE_GO_VERSION=1.25.7-r0
ARG APKEDGE_ZIP_VERSION=3.0-r13
RUN apk update
RUN apk add --no-cache \
    # docker
    docker@edge=${APKEDGE_DOCKER_VERSION} \
    docker-cli-compose@edge=${APKEDGE_DOCKER_CLI_COMPOSE_VERSION} \
    # dev tools
    git@edge=${APKEDGE_GIT_VERSION} \
    openssh-client@edge=${APKEDGE_OPENSSH_VERSION} \
    # compiler tools
    gcompat@edge=${APKEDGE_GCOMPAT_VERSION} \
    # Java JRE for Sonar Scanner
    openjdk25-jre-headless@edge=${APKEDGE_OPENJDK25_JRE_HEADLESS_VERSION} \
    # Chromium for browser tests like lighthouse or e2e tests
    chromium@edge=${APKEDGE_CHROMIUM_VERSION} \
    # Golang
    go@edge=${APKEDGE_GO_VERSION} \
    # misc
    zip@edge=${APKEDGE_ZIP_VERSION}

ARG NPM___AT__ANTFU__NI_VERSION=28.2.0
ARG NPM_BUN_VERSION=1.3.9    
RUN npm i -g @antfu/ni@${NPM___AT__ANTFU__NI_VERSION} bun@${NPM_BUN_VERSION}
