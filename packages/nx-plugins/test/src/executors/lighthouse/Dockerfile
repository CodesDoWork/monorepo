ARG IMAGE_BASE
ARG PROJECT_VERSION="latest"

FROM $IMAGE_BASE/base:$PROJECT_VERSION AS base

RUN apk add chromium
RUN yarn global add lighthouse@12.2.1

WORKDIR /lighthouse-reports
ENTRYPOINT ["lighthouse", "--chrome-flags='--headless --no-sandbox'"]
