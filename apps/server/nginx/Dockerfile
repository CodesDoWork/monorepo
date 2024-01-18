FROM openresty/openresty:alpine-fat

RUN mkdir /var/log/nginx

RUN apk add --no-cache openssl-dev
RUN apk add --no-cache git
RUN apk add --no-cache gcc
RUN luarocks install lua-resty-openidc

WORKDIR /etc/nginx
COPY ./conf conf.d
COPY ./lua lua

WORKDIR /usr/local/openresty/nginx/conf
COPY ./envs.conf .
RUN echo "include envs.conf;" | cat - nginx.conf > nginx_new.conf && mv nginx_new.conf nginx.conf
