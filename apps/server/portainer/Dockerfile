FROM codesdowork/monorepo-private/base AS base
FROM codesdowork/monorepo-private/workspace AS workspace


FROM portainer/portainer-ce:latest

COPY --from=workspace /app/libs/server/ssl/certs/server.crt /etc/ssl/certs/server.crt
