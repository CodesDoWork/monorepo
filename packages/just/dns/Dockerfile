ARG IMAGE_BASE
ARG PROJECT_VERSION
ARG DOCKER_PROXY

ARG APP_NAME=just-dns
ARG APP_DIR=just/dns

FROM $IMAGE_BASE/workspace-base:$PROJECT_VERSION AS base
FROM $IMAGE_BASE/workspace-deps:$PROJECT_VERSION AS workspace-deps


FROM workspace-deps AS builder
ARG APP_NAME

COPY eslint.config.js nx.json tsconfig.json ./
COPY packages/nx-plugins ./packages/nx-plugins
COPY packages/shared ./packages/shared
COPY packages/just ./packages/just
RUN nx reset
RUN nx build $APP_NAME


FROM $DOCKER_PROXY/pihole/pihole:2025.04.0
ARG APP_DIR

COPY --from=builder /workspace/packages/$APP_DIR/dnsmasq.d/custom.conf /etc/extra/dnsmasq.d/custom.conf

ENTRYPOINT ["/bin/bash", "-c", "cp /etc/extra/dnsmasq.d/custom.conf /etc/dnsmasq.d/custom.conf && /s6-init"]
