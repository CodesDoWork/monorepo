FROM debian:stable-slim
WORKDIR /workspace
ENV PATH=/workspace/node_modules/.bin:$PATH

RUN apt-get update
RUN apt-get install -y node git docker docker-cli-compose libc++ python3 make g++
RUN npm i -g @antfu/ni pnpm
RUN pnpm config set store-dir /tmp/.pnpm-store

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/tmp/.pnpm-store nci
