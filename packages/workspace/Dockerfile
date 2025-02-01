ARG IMAGE_BASE
ARG PROJECT_VERSION="latest"

FROM $IMAGE_BASE/workspace-base:$PROJECT_VERSION
WORKDIR /workspace
ENV PATH=/workspace/node_modules/.bin:$PATH

RUN apk update
RUN apk add --no-cache docker docker-cli-compose git openssh-client
RUN npm i -g @antfu/ni@0.23.0 pnpm@9.12.2
RUN pnpm config set store-dir /tmp/.pnpm-store
