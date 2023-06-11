FROM codesdowork/monorepo-private/base AS base
FROM codesdowork/monorepo-private/workspace AS workspace


FROM workspace AS builder

RUN npx nx lint server-music-downloader -c production
RUN npx nx test server-music-downloader -c production
RUN npx nx build server-music-downloader -c production


FROM base AS deps
WORKDIR /app

COPY --from=builder /app/dist/apps/server/music-downloader/package.json .
RUN npm i


FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN apk add yt-dlp

COPY --from=builder /app/dist/apps/server/music-downloader .
COPY --from=deps /app/node_modules ./node_modules

ENTRYPOINT node .
