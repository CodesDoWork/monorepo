ARG DOCKER_REGISTRY
ARG ORGANIZATION
ARG PROJECT

ARG APP_NAME=server-dashboard
ARG APP_DIR=server/dashboard

FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/base AS base
FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/workspace AS workspace


FROM workspace AS builder
ARG APP_NAME
RUN npx nx build $APP_NAME


FROM lissy93/dashy:latest
ARG APP_DIR
ENV NODE_ENV=production

COPY --from=builder /app/dist/apps/$APP_DIR/public /app/public
HEALTHCHECK CMD node /app/services/healthcheck
