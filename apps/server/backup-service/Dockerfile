ARG DOCKER_REGISTRY
ARG ORGANIZATION
ARG PROJECT

ARG APP_NAME=backup-service
ARG APP_DIR=server/backup-service

FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/base AS base
FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/workspace AS workspace


FROM lscr.io/linuxserver/rsnapshot
ARG APP_DIR
COPY --from=workspace --chmod=111 /app/apps/$APP_DIR/healthcheck.sh /
HEALTHCHECK CMD /healthcheck.sh

COPY --from=workspace /app/apps/$APP_DIR/config /config
