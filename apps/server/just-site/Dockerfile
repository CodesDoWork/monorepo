ARG IMAGE_BASE

ARG APP_NAME=server-just-site
ARG APP_DIR=server/just-site

FROM $IMAGE_BASE/base AS base
FROM $IMAGE_BASE/workspace AS workspace


FROM workspace AS builder
ARG APP_NAME

COPY . .
RUN npx nx build $APP_NAME


FROM base
ARG APP_DIR

WORKDIR /app
COPY --from=builder /workspace/apps/$APP_DIR/build .
COPY --from=builder /workspace/apps/$APP_DIR/package.json .

ENV PORT=80
EXPOSE ${PORT}
CMD ["node", "index.js"]
