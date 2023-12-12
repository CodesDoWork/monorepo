ARG DOCKER_REGISTRY
ARG ORGANIZATION
ARG PROJECT

ARG APP_NAME=server-renovate
ARG APP_DIR=server/renovate

FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/base AS base
FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/workspace AS workspace


FROM renovate/renovate
ARG APP_DIR
COPY --from=workspace /app/apps/$APP_DIR/config.js /usr/src/app/
