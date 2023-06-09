FROM node:19-alpine AS base

FROM base AS deps
WORKDIR /app

COPY package.json .
COPY .npmrc .
COPY yarn.lock .
RUN yarn config set strict-ssl false
RUN yarn --frozen-lockfile

WORKDIR /prod
ENV NODE_ENV production
RUN cp /app/package.json .
RUN cp /app/yarn.lock .
RUN yarn --frozen-lockfile --prod

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json .
COPY tsconfig.json .
COPY .eslintrc.yml .
COPY .prettierrc .
COPY src ./src

RUN yarn lint
RUN yarn build
RUN yarn test


FROM base AS runner

ENV NODE_ENV=production

# create data directory for mounted volumes, which is backed up
RUN mkdir /data

# install rsnapshot for backups, copy config files and validate config
RUN apk add rsnapshot --no-cache
COPY ./config/rsnapshot.conf /etc
COPY ./config/crontabs/root /var/spool/cron/crontabs
RUN rsnapshot configtest

WORKDIR /app
COPY package.json .
COPY --from=deps /prod/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENTRYPOINT crond && yarn serve
