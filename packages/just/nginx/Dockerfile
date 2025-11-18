ARG DOCKER_PROXY

FROM $DOCKER_PROXY/openresty/openresty:1.27.1.2-4-alpine-fat
ARG APP_DIR=just/nginx

RUN mkdir /var/log/nginx

RUN apk add --no-cache openssl-dev git gcc
RUN luarocks install lua-resty-openidc 1.8.0

WORKDIR /etc/nginx
COPY ./packages/$APP_DIR/conf conf.d
COPY ./packages/$APP_DIR/lua lua

WORKDIR /usr/local/openresty/nginx/conf
COPY ./packages/$APP_DIR/envs.conf .
RUN echo "include envs.conf;" | cat - nginx.conf > nginx_new.conf && mv nginx_new.conf nginx.conf
