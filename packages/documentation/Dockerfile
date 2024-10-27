ARG IMAGE_BASE
ARG PROJECT_VERSION="latest"

ARG APP_NAME=documentation
ARG APP_DIR=documentation

FROM $IMAGE_BASE/base:$PROJECT_VERSION AS base
FROM $IMAGE_BASE/workspace-deps:$PROJECT_VERSION AS workspace-deps


FROM workspace-deps AS builder
ARG APP_NAME

COPY . .
RUN nx build $APP_NAME


FROM nginx:1.27.1-alpine-slim
ARG APP_DIR
COPY --from=builder /workspace/dist/packages/$APP_DIR /usr/share/nginx/html
