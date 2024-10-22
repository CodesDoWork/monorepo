ARG IMAGE_BASE

FROM $IMAGE_BASE/base AS base

RUN apk add chromium
RUN npm i -g lighthouse@12.2.1

WORKDIR /lighthouse-reports
ENTRYPOINT ["lighthouse", "--chrome-flags='--headless --no-sandbox'"]
