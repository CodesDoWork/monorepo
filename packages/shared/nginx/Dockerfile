ARG DOCKER_PROXY
ARG IMAGE_BASE
ARG PROJECT_VERSION

ARG APP_NAME=shared-nginx
ARG CONFIG_APP_NAME=${APP_NAME}-configurator
ARG APP_DIR=shared/nginx
ARG CONFIG_APP_DIR=${APP_DIR}/configurator

ARG DOCKER_OPENRESTY__OPENRESTY_VERSION=1.27.1.2-11-alpine-fat

FROM ${IMAGE_BASE}/workspace-base:${PROJECT_VERSION} AS base
FROM ${IMAGE_BASE}/workspace-deps:${PROJECT_VERSION} AS workspace-deps


FROM workspace-deps AS builder
ARG CONFIG_APP_NAME

COPY .gitignore eslint.config.js nx.json tsconfig.json ./
COPY packages/nx-plugins ./packages/nx-plugins
COPY packages/shared ./packages/shared
RUN nx reset
RUN nx build ${CONFIG_APP_NAME}


FROM ${DOCKER_PROXY}openresty/openresty:${DOCKER_OPENRESTY__OPENRESTY_VERSION}
ARG APP_DIR
ARG CONFIG_APP_DIR
ARG CONFIG_APP_NAME

RUN mkdir /var/log/nginx

RUN apk add --no-cache openssl-dev git gcc docker
ARG LUAROCKS_LUA_RESTY_OPENIDC_VERSION=1.8.0
RUN luarocks install lua-resty-openidc ${LUAROCKS_LUA_RESTY_OPENIDC_VERSION}

RUN sed -i "1i include envs.conf;" /usr/local/openresty/nginx/conf/nginx.conf

WORKDIR /etc/nginx
COPY --from=builder --chmod=755 /workspace/dist/packages/${CONFIG_APP_DIR} .
COPY ./packages/${APP_DIR}/conf conf.d
COPY ./packages/${APP_DIR}/lua lua

ENV CONFIG_APP_NAME=${CONFIG_APP_NAME}
COPY ./packages/${APP_DIR}/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
