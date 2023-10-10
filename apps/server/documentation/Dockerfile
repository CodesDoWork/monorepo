FROM codesdowork/monorepo-private/base AS base
FROM codesdowork/monorepo-private/workspace AS workspace


FROM workspace AS builder
RUN cp libs/branding/assets/img/logo.svg apps/server/documentation/docs/public
RUN cp libs/branding/assets/img/icon.svg apps/server/documentation/docs/public
RUN cp libs/branding/assets/favicon/favicon.ico apps/server/documentation/docs/public
RUN npx vitepress build --base /docs/ apps/server/documentation/docs


FROM nginx:1-alpine-slim

COPY --from=builder /app/dist/apps/server/documentation /usr/share/nginx/html/docs
