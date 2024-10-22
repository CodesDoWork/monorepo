ARG IMAGE_BASE

FROM ${IMAGE_BASE}/workspace
RUN --mount=type=cache,target=/tmp/.pnpm-store nci
