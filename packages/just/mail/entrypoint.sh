#!/bin/bash

nohup dockerd >/dev/null 2>&1 &
until docker info >/dev/null 2>&1; do
  echo "Waiting for Docker daemon..."
  sleep 1
done
echo "Docker is ready"
docker info

docker compose up --wait

cp /etc/letsencrypt/live/${DOMAIN}/fullchain.pem ./data/assets/ssl/cert.pem
cp /etc/letsencrypt/live/${DOMAIN}/privkey.pem ./data/assets/ssl/key.pem

docker compose logs -f
