ARG DOCKER_REGISTRY
ARG ORGANIZATION
ARG PROJECT

ARG APP_NAME=server-nginx
ARG APP_DIR=server/nginx

FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/base AS base
FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/workspace AS workspace


FROM openresty/openresty:alpine-fat
ARG APP_DIR

RUN mkdir /var/log/nginx

RUN apk add --no-cache openssl-dev
RUN apk add --no-cache git
RUN apk add --no-cache gcc
RUN luarocks install lua-resty-openidc

WORKDIR /etc/nginx
COPY --from=workspace /app/apps/$APP_DIR/conf conf.d
COPY --from=workspace /app/apps/$APP_DIR/lua lua

WORKDIR /usr/local/openresty/nginx/conf
ARG APP_DIR
COPY --from=workspace /app/apps/$APP_DIR/envs.conf .
RUN echo "include envs.conf;" | cat - nginx.conf > nginx_new.conf && mv nginx_new.conf nginx.conf
