ARG DOCKER_PROXY

FROM $DOCKER_PROXY/prom/prometheus:v2.54.1
ARG APP_DIR=just/prometheus

COPY /packages/$APP_DIR/prometheus.yaml /etc/prometheus/prometheus.yml
