FROM codesdowork/monorepo-private/base AS base
FROM codesdowork/monorepo-private/workspace AS workspace


FROM openresty/openresty:alpine-fat

RUN mkdir /var/log/nginx

RUN apk add --no-cache openssl-dev
RUN apk add --no-cache git
RUN apk add --no-cache gcc
RUN luarocks install lua-resty-openidc

WORKDIR /etc/nginx
COPY --from=workspace /app/libs/server/ssl/certs/server.crt ssl/
COPY --from=workspace /app/libs/server/ssl/certs/server.key ssl/
COPY --from=workspace /app/apps/server/nginx/conf conf.d
COPY --from=workspace /app/apps/server/nginx/lua lua

WORKDIR /usr/local/openresty/nginx/conf
COPY --from=workspace /app/apps/server/nginx/envs.conf .
RUN echo "include envs.conf;" | cat - nginx.conf > nginx_new.conf && mv nginx_new.conf nginx.conf
