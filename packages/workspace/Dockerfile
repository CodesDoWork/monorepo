ARG IMAGE_BASE
ARG PROJECT_VERSION

FROM $IMAGE_BASE/workspace-base:$PROJECT_VERSION
WORKDIR /workspace

ENV PATH=/workspace/node_modules/.bin:$PATH
ENV SONAR_SCANNER_SKIP_JRE_PROVISIONING=true

RUN apk update
RUN apk add --no-cache \
    # docker
    docker docker-cli-compose \
    # dev tools
    git openssh-client \
    # compiler tools
    gcompat \
    # Java JRE for Sonar Scanner
    openjdk25-jre-headless \
    # Chromium for browser tests like lighthouse or e2e tests
    chromium \
    # misc
    zip

RUN npm i -g @antfu/ni@23.3.1 bun@1.2.2
