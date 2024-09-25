ARG IMAGE_BASE

FROM $IMAGE_BASE/base AS base
FROM $IMAGE_BASE/workspace AS workspace


FROM workspace AS builder

COPY . .
RUN nx build cms-dashboard-config


FROM directus/directus:11.1.0

USER root
RUN mkdir -p /dashy/config
RUN chown node:node /dashy/config
USER node

RUN mkdir ./extensions/.registry
COPY --chown=node:node --from=builder /workspace/dist/src/cms ./extensions
