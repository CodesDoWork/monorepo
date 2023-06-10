FROM codesdowork/monorepo-private/base AS base
FROM codesdowork/monorepo-private/workspace AS workspace


FROM nginx:1-alpine

RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

COPY --from=workspace --chown=nginx:nginx /app/libs/server/ssl/certs /var/www/ssl
COPY --from=workspace --chown=nginx:nginx /app/apps/server/reverse-proxy/conf /etc/nginx/conf.d
COPY --from=workspace --chown=nginx:nginx /app/apps/server/reverse-proxy/templates /etc/nginx/templates
