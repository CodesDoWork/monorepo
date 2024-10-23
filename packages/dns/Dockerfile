ARG IMAGE_BASE

ARG APP_NAME=dns
ARG APP_DIR=dns

FROM $IMAGE_BASE/base AS base
FROM $IMAGE_BASE/workspace-deps AS workspace-deps


FROM workspace-deps AS builder
ARG APP_NAME

COPY . .
RUN nx build $APP_NAME


FROM pihole/pihole:2024.07.0
ARG APP_DIR

COPY --from=builder /workspace/packages/$APP_DIR/dnsmasq.d/custom.conf /etc/extra/dnsmasq.d/custom.conf

ENTRYPOINT ["/bin/bash", "-c", "cp /etc/extra/dnsmasq.d/custom.conf /etc/dnsmasq.d/custom.conf && /s6-init"]
