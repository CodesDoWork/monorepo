ARG IMAGE_BASE
ARG PROJECT_VERSION="latest"

FROM $IMAGE_BASE/workspace:$PROJECT_VERSION
COPY package.json pnpm-lock.yaml ./
RUN nci
