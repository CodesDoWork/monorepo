ARG DOCKER_PROXY


FROM $DOCKER_PROXY/alpine:3.22 AS builder
ARG APP_DIR=just/prometheus

WORKDIR /app
RUN apk add envsubst
COPY packages/$APP_DIR/prometheus.yaml packages/$APP_DIR/.env ./
RUN export $(cat .env) && envsubst < prometheus.yaml > ./prometheus-ready.yaml


FROM $DOCKER_PROXY/prom/prometheus:v3.8.1
COPY --from=builder /app/prometheus-ready.yaml /etc/prometheus/prometheus.yml
