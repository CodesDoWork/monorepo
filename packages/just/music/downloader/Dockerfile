ARG IMAGE_BASE
ARG PROJECT_VERSION="latest"

ARG APP_NAME=just-music-downloader
ARG APP_DIR=just/music/downloader

FROM $IMAGE_BASE/base:$PROJECT_VERSION AS base
FROM $IMAGE_BASE/workspace-deps:$PROJECT_VERSION AS workspace-deps


FROM workspace-deps AS builder
ARG APP_NAME

COPY . .
RUN nx build $APP_NAME


FROM base AS deps
ARG APP_DIR

COPY --from=builder /workspace/dist/packages/$APP_DIR/package.json ./
RUN yarn install


FROM base AS runner
ARG APP_DIR
ENV NODE_ENV=production

RUN apk update
RUN apk add yt-dlp

COPY --from=builder /workspace/dist/packages/$APP_DIR .
COPY --from=deps /app/node_modules ./node_modules

USER node

ENTRYPOINT next start
