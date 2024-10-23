#!/bin/sh

echo dns_cloudflare_api_token=${CLOUDFLARE_API_TOKEN} > /cloudflare.ini
chmod 600 /cloudflare.ini
certbot -v certonly --reinstall \
    --dns-cloudflare --dns-cloudflare-credentials /cloudflare.ini --dns-cloudflare-propagation-seconds 20 \
    --email ${CERTBOT_EMAIL} --agree-tos --no-eff-email \
    -d ${DOMAIN} -d *.${DOMAIN}
