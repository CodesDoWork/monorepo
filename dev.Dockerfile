FROM node:20-alpine AS dev
WORKDIR /app

ENV PATH="${PATH}:/app/node_modules/.bin"

RUN npm i -g @antfu/ni
RUN npm i -g pnpm
RUN pnpm config set store-dir node_modules/.pnpm-store

RUN apk add rsnapshot
RUN apk add yt-dlp
