ARG IMAGE_BASE
ARG PROJECT_VERSION="latest"

ARG APP_NAME=just-dns
ARG APP_DIR=just/dns

FROM $IMAGE_BASE/base:$PROJECT_VERSION AS base
FROM $IMAGE_BASE/workspace-deps:$PROJECT_VERSION AS workspace-deps


FROM workspace-deps AS builder
ARG APP_NAME

COPY . .
RUN nx build $APP_NAME


FROM pihole/pihole:2024.07.0
ARG APP_DIR

COPY --from=builder /workspace/packages/$APP_DIR/dnsmasq.d/custom.conf /etc/extra/dnsmasq.d/custom.conf

ENTRYPOINT ["/bin/bash", "-c", "cp /etc/extra/dnsmasq.d/custom.conf /etc/dnsmasq.d/custom.conf && /s6-init"]
