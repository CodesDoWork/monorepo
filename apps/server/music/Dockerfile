ARG DOCKER_REGISTRY
ARG ORGANIZATION
ARG PROJECT

ARG APP_NAME=server-music
ARG APP_DIR=server/music

FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/base AS base
FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/workspace AS workspace


FROM deluan/navidrome:latest

RUN adduser --disabled-password navidrome

RUN mkdir -p /data
RUN chown -R navidrome:navidrome /data
RUN mkdir -p /music
RUN chown -R navidrome:navidrome /music

USER navidrome
