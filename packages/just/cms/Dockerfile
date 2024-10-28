ARG IMAGE_BASE
ARG PROJECT_VERSION="latest"

ARG APP_NAME=just-cms
ARG APP_DIR=just/cms

FROM $IMAGE_BASE/base:$PROJECT_VERSION AS base
FROM $IMAGE_BASE/workspace-deps:$PROJECT_VERSION AS workspace-deps


FROM workspace-deps AS builder

COPY . .
RUN nx build just-cms-dashboard-config


FROM directus/directus:11.1.1
ARG APP_DIR

USER root
RUN mkdir -p /dashy/config
RUN chown node:node /dashy/config
USER node

RUN mkdir ./extensions/.registry
COPY --chown=node:node --from=builder /workspace/dist/packages/$APP_DIR ./extensions
