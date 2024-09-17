FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y certbot python3-certbot-nginx python3-certbot-dns-cloudflare

WORKDIR /app

ENTRYPOINT ["echo", "dns_cloudflare_api_token=${CLOUDFLARE_API_TOKEN}", "> /app/cloudflare.ini", "&&", "certbot"]
