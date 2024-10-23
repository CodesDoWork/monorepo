ARG IMAGE_BASE
ARG PROJECT_VERSION="latest"

ARG APP_NAME=just-site
ARG APP_DIR=just-site

FROM $IMAGE_BASE/base:$PROJECT_VERSION AS base
FROM $IMAGE_BASE/workspace-deps:$PROJECT_VERSION AS workspace-deps


FROM workspace-deps AS builder
ARG APP_NAME

COPY . .
RUN nx build $APP_NAME


FROM base
ARG APP_DIR

WORKDIR /app
COPY --from=builder /workspace/dist/packages/$APP_DIR .
COPY --from=builder /workspace/packages/$APP_DIR/package.json .

ENV PORT=80
EXPOSE ${PORT}
CMD ["node", "index.js"]
