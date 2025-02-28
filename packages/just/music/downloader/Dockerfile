ARG IMAGE_BASE
ARG PROJECT_VERSION

ARG APP_NAME=just-music-downloader
ARG APP_DIR=just/music/downloader

FROM $IMAGE_BASE/workspace-base:$PROJECT_VERSION AS base
FROM $IMAGE_BASE/workspace-deps:$PROJECT_VERSION AS workspace-deps


FROM workspace-deps AS builder
ARG APP_NAME

COPY eslint.config.js nx.json tsconfig.json ./
COPY packages/nx-plugins ./packages/nx-plugins
COPY packages/shared ./packages/shared
COPY packages/just ./packages/just
RUN nx build $APP_NAME


FROM base AS runner
ARG APP_DIR
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk update
RUN apk add yt-dlp

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /workspace/dist/packages/${APP_DIR}/standalone/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /workspace/dist/packages/${APP_DIR}/static ./dist/packages/${APP_DIR}/static
COPY --from=builder --chown=nextjs:nodejs /workspace/dist/packages/${APP_DIR}/standalone/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /workspace/dist/packages/${APP_DIR}/standalone/packages ./packages

WORKDIR /app/packages/${APP_DIR}
COPY --from=builder --chown=nextjs:nodejs /workspace/packages/${APP_DIR}/public ./public

USER nextjs

CMD ["node", "server.js"]
