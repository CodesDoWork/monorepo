ARG DOCKER_PROXY


ARG DOCKER_RENOVATE__RENOVATE_VERSION=43.76.1
FROM ${DOCKER_PROXY}renovate/renovate:${DOCKER_RENOVATE__RENOVATE_VERSION}
ARG APP_DIR=shared/renovate

COPY /packages/${APP_DIR}/config.js /usr/src/app/config.js
