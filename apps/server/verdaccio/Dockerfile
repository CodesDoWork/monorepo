FROM codesdowork/monorepo-private/base AS base
FROM codesdowork/monorepo-private/workspace AS workspace


FROM alpine:3 AS builder
WORKDIR /app

ARG AUTH_CLIENT_ID=verdaccio
ARG AUTH_CLIENT_SECRET=secret

COPY --from=workspace /app/apps/server/verdaccio/config.yaml .
RUN sed -i "s/\$AUTH_CLIENT_ID/$AUTH_CLIENT_ID/g" config.yaml
RUN sed -i "s/\$AUTH_CLIENT_SECRET/$AUTH_CLIENT_SECRET/g" config.yaml


FROM verdaccio/verdaccio:5

USER root
RUN npm i -g verdaccio-openid-connect
COPY --from=workspace /app/libs/server/ssl/certs/server.crt /usr/local/share/ca-certificates/
USER verdaccio

COPY --from=builder /app/config.yaml /verdaccio/conf/
