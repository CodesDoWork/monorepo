ARG DOCKER_PROXY

FROM $DOCKER_PROXY/renovate/renovate:38.185.0
ARG APP_DIR=shared/renovate

COPY /packages/$APP_DIR/config.js /usr/src/app/config.js
