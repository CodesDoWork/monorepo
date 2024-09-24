ARG IMAGE_BASE

ARG APP_NAME=just-site
ARG APP_DIR=just-site

FROM $IMAGE_BASE/base AS base
FROM $IMAGE_BASE/workspace AS workspace


FROM workspace AS builder
ARG APP_NAME

COPY . .
RUN npx nx build $APP_NAME


FROM base
ARG APP_DIR

WORKDIR /app
COPY --from=builder /workspace/dist/src/$APP_DIR .
COPY --from=builder /workspace/src/$APP_DIR/package.json .

ENV PORT=80
EXPOSE ${PORT}
CMD ["node", "index.js"]
