ARG DOCKER_REGISTRY
ARG ORGANIZATION
ARG PROJECT

ARG APP_NAME=server-scoreboard
ARG APP_DIR=server/scoreboard

FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/base AS base
FROM $DOCKER_REGISTRY/$ORGANIZATION/$PROJECT/workspace AS workspace


FROM workspace AS builder
ARG APP_NAME

COPY . .
RUN npx nx lint $APP_NAME -c production
RUN npx nx test $APP_NAME -c production
RUN npx nx build $APP_NAME -c production


FROM base AS deps
ARG APP_DIR

COPY --from=builder /app/dist/apps/$APP_DIR/package.json ./
RUN npm i


FROM base AS runner
ARG APP_DIR
ENV NODE_ENV production

COPY --from=builder /app/dist/apps/$APP_DIR .
COPY --from=deps /app/node_modules ./node_modules

USER node

ENTRYPOINT npm start
