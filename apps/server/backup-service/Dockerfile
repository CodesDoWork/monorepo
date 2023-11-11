FROM codesdowork/monorepo-private/base AS base
FROM codesdowork/monorepo-private/workspace AS workspace


FROM lscr.io/linuxserver/rsnapshot

COPY --from=workspace app/apps/server/backup-service/config /config
