FROM openresty/openresty:1.25.3.2-0-alpine-fat

RUN mkdir /var/log/nginx

RUN apk add --no-cache openssl-dev
RUN apk add --no-cache git
RUN apk add --no-cache gcc
RUN luarocks install lua-resty-openidc

WORKDIR /etc/nginx
COPY ./packages/nginx/conf conf.d
COPY ./packages/nginx/lua lua

WORKDIR /usr/local/openresty/nginx/conf
COPY ./packages/nginx/envs.conf .
RUN echo "include envs.conf;" | cat - nginx.conf > nginx_new.conf && mv nginx_new.conf nginx.conf
