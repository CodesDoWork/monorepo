ARG IMAGE_BASE
ARG PROJECT_VERSION="latest"

FROM $IMAGE_BASE/base:$PROJECT_VERSION AS base
FROM $IMAGE_BASE/workspace-deps:$PROJECT_VERSION AS workspace-deps


FROM workspace-deps AS builder

COPY . .
RUN nx build cms-dashboard-config


FROM directus/directus:11.1.0

USER root
RUN mkdir -p /dashy/config
RUN chown node:node /dashy/config
USER node

RUN mkdir ./extensions/.registry
COPY --chown=node:node --from=builder /workspace/dist/packages/cms ./extensions
