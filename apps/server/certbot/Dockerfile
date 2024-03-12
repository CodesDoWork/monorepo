FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y certbot python3-certbot-nginx python3-certbot-dns-cloudflare

ENTRYPOINT ["certbot"]
