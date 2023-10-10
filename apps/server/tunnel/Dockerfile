FROM codesdowork/monorepo-private/base AS base
FROM codesdowork/monorepo-private/workspace AS workspace


FROM node:20-alpine

RUN npm i -g localtunnel
ENTRYPOINT lt
