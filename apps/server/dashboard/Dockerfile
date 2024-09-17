ARG IMAGE_BASE

ARG APP_NAME=server-dashboard
ARG APP_DIR=server/dashboard

FROM $IMAGE_BASE/base AS base
FROM $IMAGE_BASE/workspace AS workspace


FROM workspace AS builder
ARG APP_NAME
ARG APP_DIR

COPY . .
RUN npx nx build $APP_NAME


FROM lissy93/dashy:2.1.2
ENV NODE_ENV=production
ARG APP_DIR

COPY --from=builder /workspace/dist/apps/$APP_DIR/public /app/public
RUN yarn build
