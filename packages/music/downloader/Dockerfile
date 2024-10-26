ARG IMAGE_BASE
ARG PROJECT_VERSION="latest"

ARG APP_NAME=music-downloader
ARG APP_DIR=music/downloader

FROM $IMAGE_BASE/base:$PROJECT_VERSION AS base
FROM $IMAGE_BASE/workspace-deps:$PROJECT_VERSION AS workspace-deps


FROM workspace-deps AS builder
ARG APP_NAME

COPY . .
RUN nx build $APP_NAME
