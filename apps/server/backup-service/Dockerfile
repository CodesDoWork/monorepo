FROM codesdowork/monorepo-private/base AS base
FROM codesdowork/monorepo-private/workspace AS workspace


FROM workspace AS builder

RUN npx nx lint server-backup-service -c production
RUN npx nx test server-backup-service -c production
RUN npx nx build server-backup-service -c production


FROM base AS deps
WORKDIR /app

RUN npm i -g @antfu/ni

COPY --from=builder /app/dist/apps/server/backup-service/package.json .
RUN ni


FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# create data directory for mounted volumes, which is backed up
RUN mkdir /data

# install rsnapshot for backups, copy config files and validate config
RUN apk add rsnapshot
COPY --from=builder app/apps/server/backup-service/config/rsnapshot.conf /etc
COPY --from=builder app/apps/server/backup-service/config/crontabs/root /var/spool/cron/crontabs
RUN rsnapshot configtest

COPY --from=builder /app/dist/apps/server/backup-service .
COPY --from=deps /app/node_modules ./node_modules

ENTRYPOINT crond && node .
