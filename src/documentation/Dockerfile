ARG IMAGE_BASE

ARG APP_NAME=documentation
ARG APP_DIR=documentation

FROM $IMAGE_BASE/base AS base
FROM $IMAGE_BASE/workspace AS workspace


FROM workspace AS builder
ARG APP_NAME

COPY . .
RUN nx build $APP_NAME


FROM nginx:1.27.1-alpine-slim
ARG APP_DIR
COPY --from=builder /workspace/dist/src/$APP_DIR /usr/share/nginx/html
