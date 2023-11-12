ARG DOCKER_REGISTRY
ARG ORGANIZATION
ARG PROJECT

ARG APP_NAME=server-prometheus
ARG APP_DIR=server/prometheus

FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/base AS base
FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/workspace AS workspace


FROM prom/prometheus
ARG APP_DIR
COPY --from=workspace /app/apps/$APP_DIR/prometheus.yml /etc/prometheus/
