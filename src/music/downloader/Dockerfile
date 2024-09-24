ARG IMAGE_BASE

ARG APP_NAME=music-downloader
ARG APP_DIR=music/downloader

FROM $IMAGE_BASE/base AS base
FROM $IMAGE_BASE/workspace AS workspace


FROM workspace AS builder
ARG APP_NAME

COPY . .
RUN npx nx lint $APP_NAME -c production
RUN npx nx test $APP_NAME -c production
RUN npx nx build $APP_NAME -c production


FROM base AS deps
ARG APP_DIR

COPY --from=builder /workspace/dist/src/$APP_DIR/package.json ./
RUN npm i


FROM base AS runner
ARG APP_DIR
ENV NODE_ENV=production

RUN apk update
RUN apk add yt-dlp

COPY --from=builder /workspace/dist/src/$APP_DIR .
COPY --from=deps /app/node_modules ./node_modules

USER node

ENTRYPOINT npm start
