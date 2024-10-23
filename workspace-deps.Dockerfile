ARG IMAGE_BASE
ARG PROJECT_VERSION="latest"

FROM $IMAGE_BASE/workspace:$PROJECT_VERSION
RUN --mount=type=cache,target=/tmp/.pnpm-store nci
