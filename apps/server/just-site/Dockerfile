ARG DOCKER_REGISTRY
ARG ORGANIZATION
ARG PROJECT

ARG APP_NAME=server-just-site
ARG APP_DIR=server/just-site

FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/base AS base
FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/workspace AS workspace


FROM workspace AS builder
ARG APP_NAME

COPY . .
RUN npx nx build $APP_NAME


FROM base
ARG APP_DIR

WORKDIR /app
COPY --from=builder /app/apps/$APP_DIR/build .
COPY --from=builder /app/apps/$APP_DIR/package.json .

ENV PORT=80
EXPOSE ${PORT}
CMD ["node", "index.js"]
