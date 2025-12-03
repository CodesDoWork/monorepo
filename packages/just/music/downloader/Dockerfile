ARG IMAGE_BASE
ARG PROJECT_VERSION
ARG DOCKER_PROXY

ARG APP_NAME=just-music-downloader
ARG APP_DIR=just/music/downloader

ARG SPOTDL_VERSION=4.4.3

FROM $IMAGE_BASE/workspace-base:$PROJECT_VERSION AS base
FROM $IMAGE_BASE/workspace-deps:$PROJECT_VERSION AS workspace-deps


FROM workspace-deps AS builder
ARG APP_NAME

COPY .gitignore eslint.config.js nx.json tsconfig.json ./
COPY packages/nx-plugins ./packages/nx-plugins
COPY packages/shared ./packages/shared
COPY packages/just ./packages/just
RUN nx reset
RUN nx build $APP_NAME


FROM $DOCKER_PROXY/python:3.14-slim AS spotdl-builder
ARG SPOTDL_VERSION

WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends git binutils
RUN git clone https://github.com/spotDL/spotify-downloader && cd spotify-downloader && git checkout v${SPOTDL_VERSION}

WORKDIR /app/spotify-downloader
RUN pip install uv
RUN uv sync
RUN uv run scripts/build.py


FROM $DOCKER_PROXY/node:25.2.1-slim
ARG APP_DIR
ARG SPOTDL_VERSION

ENV NODE_ENV=production

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends wget ca-certificates ffmpeg \
    && rm -rf /var/lib/apt/lists/*
RUN ARCH="$(dpkg --print-architecture)" \
    && case "$ARCH" in \
        amd64)  BIN="yt-dlp_linux" ;; \
        arm64)  BIN="yt-dlp_arm64" ;; \
        armhf)  BIN="yt-dlp_linux_armv7l" ;; \
        *) echo "Unsupported architecture: $ARCH" && exit 1 ;; \
        esac \
    && wget -O /usr/local/bin/yt-dlp "https://github.com/yt-dlp/yt-dlp/releases/download/2025.11.12/${BIN}" \
    && chmod +x /usr/local/bin/yt-dlp

COPY --from=spotdl-builder /app/spotify-downloader/dist/spotdl-${SPOTDL_VERSION}-linux /usr/local/bin/spotdl
COPY --from=builder /workspace/dist/packages/$APP_DIR .
COPY --from=builder /workspace/packages/$APP_DIR/package.json .

USER node
CMD ["node", "index.js"]
