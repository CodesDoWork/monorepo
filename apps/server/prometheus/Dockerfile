FROM codesdowork/monorepo-private/base AS base
FROM codesdowork/monorepo-private/workspace AS workspace


FROM prom/prometheus

COPY --from=workspace /app/apps/server/prometheus/prometheus.yml /etc/prometheus/
