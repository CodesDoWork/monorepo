ARG IMAGE_BASE
ARG PROJECT_VERSION

ARG APP_NAME=just-website
ARG APP_DIR=just/website

FROM $IMAGE_BASE/workspace-base:$PROJECT_VERSION AS base
FROM $IMAGE_BASE/workspace-deps:$PROJECT_VERSION AS workspace-deps


FROM workspace-deps AS builder
ARG APP_NAME

COPY eslint.config.js nx.json tsconfig.json ./
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
CMD ["node", "index.js"]
