ARG IMAGE_BASE
ARG PROJECT_VERSION
ARG DOCKER_PROXY

ARG APP_NAME=just-music-store
ARG APP_DIR=just/music/store

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


FROM $DOCKER_PROXY/python:3.14.2-alpine3.23 AS python
RUN pip install r128gain


FROM base
ARG APP_DIR

ENV NODE_ENV=production

WORKDIR /app

RUN apk update && \
    apk add ffmpeg && \
    rm -rf /var/cache/apk/*
COPY --from=python /usr/local/bin/r128gain /usr/local/bin

COPY --from=builder /workspace/dist/packages/$APP_DIR .
RUN npm i

USER node
CMD ["node", "main.js"]
