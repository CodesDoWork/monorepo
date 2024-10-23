ARG IMAGE_BASE

ARG APP_NAME=music-downloader
ARG APP_DIR=music/downloader

FROM $IMAGE_BASE/base AS base
FROM $IMAGE_BASE/workspace-deps AS workspace-deps


FROM workspace-deps AS builder
ARG APP_NAME

COPY . .
RUN nx lint $APP_NAME -c production
RUN nx test $APP_NAME -c production
RUN nx build $APP_NAME -c production


FROM base AS deps
ARG APP_DIR

COPY --from=builder /workspace/dist/packages/$APP_DIR/package.json ./
RUN npm i


FROM base AS runner
ARG APP_DIR
ENV NODE_ENV=production

RUN apk update
RUN apk add yt-dlp

COPY --from=builder /workspace/dist/packages/$APP_DIR .
COPY --from=deps /app/node_modules ./node_modules

USER node

ENTRYPOINT npm start
