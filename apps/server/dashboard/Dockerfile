FROM codesdowork/monorepo-private/base AS base
FROM codesdowork/monorepo-private/workspace AS workspace


FROM workspace AS builder
RUN npx nx build server-dashboard


FROM lissy93/dashy:latest

ENV NODE_ENV=production

COPY --from=builder /app/dist/apps/server/dashboard/public /app/public
HEALTHCHECK CMD node /app/services/healthcheck
