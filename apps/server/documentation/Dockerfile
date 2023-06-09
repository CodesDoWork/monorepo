FROM node:19-alpine AS base

FROM base AS deps
WORKDIR /app

COPY package.json .
COPY .npmrc .
COPY yarn.lock .
RUN yarn config set strict-ssl false
RUN yarn --frozen-lockfile


FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json .
COPY .eslintrc.yml .
COPY .prettierrc .
COPY .vitepress .vitepress
COPY docs docs

RUN yarn lint
RUN yarn build
RUN yarn test


FROM nginx:1-alpine AS runner

RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

COPY --from=builder /app/dist /usr/share/nginx/html
