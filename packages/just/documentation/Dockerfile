ARG IMAGE_BASE
ARG PROJECT_VERSION
ARG DOCKER_PROXY

ARG APP_NAME=just-documentation
ARG APP_DIR=just/documentation

FROM $IMAGE_BASE/workspace-base:$PROJECT_VERSION AS base
FROM $IMAGE_BASE/workspace-deps:$PROJECT_VERSION AS workspace-deps


FROM workspace-deps AS builder
ARG APP_NAME

COPY .gitignore eslint.config.js nx.json README.md tsconfig.json ./
COPY docs ./docs
COPY packages/nx-plugins ./packages/nx-plugins
COPY packages/shared ./packages/shared
COPY packages/just ./packages/just
RUN nx reset
RUN nx build $APP_NAME


FROM $DOCKER_PROXY/nginx:1.27.1-alpine-slim
ARG APP_DIR
COPY --from=builder /workspace/dist/packages/$APP_DIR /usr/share/nginx/html
