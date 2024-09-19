ARG IMAGE_BASE

ARG APP_NAME=server-documentation
ARG APP_DIR=server/documentation

FROM $IMAGE_BASE/base AS base
FROM $IMAGE_BASE/workspace AS workspace


FROM workspace AS builder
ARG APP_NAME

COPY . .
RUN npx nx build $APP_NAME


FROM nginx:1.27.1-alpine-slim
ARG APP_DIR
COPY --from=builder /workspace/dist/apps/$APP_DIR /usr/share/nginx/html
