ARG IMAGE_BASE
ARG PROJECT_VERSION

ARG APP_NAME=just-website
ARG APP_DIR=just/website

FROM $IMAGE_BASE/workspace-base:$PROJECT_VERSION AS base
FROM $IMAGE_BASE/workspace-deps:$PROJECT_VERSION AS workspace-deps


FROM workspace-deps AS builder
ARG APP_NAME

COPY .gitignore eslint.config.js nx.json tsconfig.json ./
COPY packages/nx-plugins ./packages/nx-plugins
COPY packages/shared ./packages/shared
COPY packages/just ./packages/just
RUN nx reset
RUN nx build $APP_NAME


FROM base
ARG APP_DIR

ENV NODE_ENV=production

WORKDIR /app
COPY --from=builder /workspace/dist/packages/$APP_DIR .
COPY --from=builder /workspace/packages/$APP_DIR/package.json .

USER node
HEALTHCHECK --interval=60s CMD "[ $(wget --spider -S http://127.0.0.1:${PORT}/ 2>&1 | grep 'HTTP/' | awk '{print $2}') == '200' ] || exit 1"
CMD ["node", "index.js"]
