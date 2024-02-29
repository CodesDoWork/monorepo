ARG DOCKER_REGISTRY
ARG ORGANIZATION
ARG PROJECT

ARG APP_NAME=server-documentation
ARG APP_DIR=server/documentation

FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/base AS base
FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/workspace AS workspace


FROM workspace AS builder
ARG APP_NAME

COPY . .
RUN npx nx build $APP_NAME


FROM nginx:1-alpine-slim
ARG APP_DIR
COPY --from=builder /app/dist/apps/$APP_DIR /usr/share/nginx/html
