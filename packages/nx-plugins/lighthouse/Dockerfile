ARG IMAGE_BASE
ARG PROJECT_VERSION="latest"

FROM $IMAGE_BASE/workspace-base:$PROJECT_VERSION AS base

RUN apk add chromium
RUN yarn global add lighthouse@12.2.1

WORKDIR /lighthouse
ENTRYPOINT ["lighthouse", "--chrome-flags='--headless --no-sandbox'"]
