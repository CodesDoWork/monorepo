FROM codesdowork/monorepo-private/base AS base
FROM codesdowork/monorepo-private/workspace AS workspace


FROM alpine:3

RUN mkdir /data
RUN apk add rsnapshot
COPY --from=workspace app/apps/server/backup-service/config/rsnapshot.conf /etc
COPY --from=workspace app/apps/server/backup-service/config/crontabs/root /var/spool/cron/crontabs
RUN rsnapshot configtest

ENTRYPOINT crond -f
