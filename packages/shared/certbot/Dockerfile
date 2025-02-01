FROM certbot/dns-cloudflare
ARG APP_DIR=shared/certbot

COPY ./packages/$APP_DIR/entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
