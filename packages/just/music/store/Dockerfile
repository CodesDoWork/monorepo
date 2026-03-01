ARG IMAGE_BASE
ARG PROJECT_VERSION

ARG APP_NAME=just-music-store
ARG APP_DIR=just/music/store

FROM ${IMAGE_BASE}/workspace-base:${PROJECT_VERSION} AS base
FROM ${IMAGE_BASE}/workspace-deps:${PROJECT_VERSION} AS workspace-deps


FROM workspace-deps AS builder
ARG APP_NAME

COPY .gitignore eslint.config.js nx.json tsconfig.json ./
COPY packages/nx-plugins ./packages/nx-plugins
COPY packages/shared ./packages/shared
COPY packages/just ./packages/just
RUN nx reset
RUN nx build ${APP_NAME}


FROM base
ARG APP_DIR

ENV NODE_ENV=production

WORKDIR /app

ARG APK_FFMPEG_VERSION=8.0.1-r1
ARG APK_PYTHON3_VERSION=3.12.12-r0
ARG APK_PY3_PIP_VERSION=25.1.1-r1
RUN apk add --no-cache \
    ffmpeg=${APK_FFMPEG_VERSION} \
    python3=${APK_PYTHON3_VERSION} \
    py3-pip=${APK_PY3_PIP_VERSION}
RUN pip install r128gain --break-system-packages

COPY --from=builder /workspace/dist/packages/${APP_DIR} .
RUN npm i

USER node
CMD ["node", "main.js"]
