ARG IMAGE_BASE

FROM ${IMAGE_BASE}/base
WORKDIR /workspace
ENV PATH=/workspace/node_modules/.bin:$PATH

RUN apk update
RUN apk add docker docker-cli-compose git
RUN npm i -g @antfu/ni pnpm
RUN pnpm config set store-dir /tmp/.pnpm-store

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/tmp/.pnpm-store nci
