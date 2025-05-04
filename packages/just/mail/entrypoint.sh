#!/bin/bash

nohup dockerd >/dev/null 2>&1 &
until docker info >/dev/null 2>&1; do
  echo "Waiting for Docker daemon..."
  sleep 1
done
echo "Docker is ready"
docker info

if [ ! -f mailcow.conf ]; then
    ./generate_config.sh
    sed -i "s/SKIP_LETS_ENCRYPT=n/SKIP_LETS_ENCRYPT=y/" mailcow.conf
fi

docker compose up
