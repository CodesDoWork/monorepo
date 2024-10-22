ARG ORGNANIZATION
ARG PROJECT
ARG IMAGE_BASE

FROM ${IMAGE_BASE}/base
WORKDIR /workspace
ENV PATH=/workspace/node_modules/.bin:$PATH

RUN apk update
RUN apk add docker docker-cli-compose git
RUN npm i -g @antfu/ni@0.23.0 pnpm@9.12.2
RUN pnpm config set store-dir /tmp/.pnpm-store

COPY package.json pnpm-lock.yaml ./
