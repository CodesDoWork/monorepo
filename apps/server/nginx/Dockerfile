FROM openresty/openresty:alpine-fat

RUN mkdir /var/log/nginx

RUN apk add --no-cache openssl-dev
RUN apk add --no-cache git
RUN apk add --no-cache gcc
RUN luarocks install lua-resty-openidc

WORKDIR /etc/nginx
COPY ./apps/server/nginx/conf conf.d
COPY ./apps/server/nginx/lua lua

WORKDIR /usr/local/openresty/nginx/conf
COPY ./apps/server/nginx/envs.conf .
RUN echo "include envs.conf;" | cat - nginx.conf > nginx_new.conf && mv nginx_new.conf nginx.conf
