ARG IMAGE_BASE
ARG PROJECT_VERSION

ARG APP_NAME=just-food
ARG APP_DIR=just/food

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
HEALTHCHECK --interval=60s CMD wget -q --spider http://127.0.0.1:${PORT}/ || exit 1
CMD ["node", "index.js"]
