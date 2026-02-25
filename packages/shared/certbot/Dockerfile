ARG DOCKER_PROXY


ARG DOCKER_CERTBOT__DNS_CLOUDFLARE_VERSION=v5.3.1
FROM ${DOCKER_PROXY}certbot/dns-cloudflare:${DOCKER_CERTBOT__DNS_CLOUDFLARE_VERSION}
ARG APP_DIR=shared/certbot

COPY ./packages/${APP_DIR}/entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
