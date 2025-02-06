ARG IMAGE_BASE
ARG PROJECT_VERSION

FROM $IMAGE_BASE/workspace:$PROJECT_VERSION
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/tmp/.pnpm-store nci
