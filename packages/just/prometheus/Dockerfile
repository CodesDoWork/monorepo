ARG DOCKER_PROXY

ARG DOCKER_ALPINE_VERSION=3.23
ARG DOCKER_PROM__PROMETHEUS_VERSION=v3.9.1


FROM ${DOCKER_PROXY}alpine:${DOCKER_ALPINE_VERSION} AS builder
ARG APP_DIR=just/prometheus

WORKDIR /app
ARG APK_GETTEXT_ENVSUBST_VERSION=0.24.1-r1
RUN apk add gettext-envsubst=${APK_GETTEXT_ENVSUBST_VERSION}
COPY packages/${APP_DIR}/prometheus.yaml packages/${APP_DIR}/.env ./
RUN export $(cat .env) && envsubst < prometheus.yaml > ./prometheus-ready.yaml


FROM ${DOCKER_PROXY}prom/prometheus:${DOCKER_PROM__PROMETHEUS_VERSION}
COPY --from=builder /app/prometheus-ready.yaml /etc/prometheus/prometheus.yml
