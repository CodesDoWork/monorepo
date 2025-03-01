ARG IMAGE_BASE
ARG PROJECT_VERSION

FROM $IMAGE_BASE/workspace-base:$PROJECT_VERSION
WORKDIR /workspace
ENV PATH=./node_modules/.bin:$PATH

RUN apk update
RUN apk add --no-cache docker docker-cli-compose git openssh-client
RUN npm i -g @antfu/ni@0.23.0 bun@1.2.2
