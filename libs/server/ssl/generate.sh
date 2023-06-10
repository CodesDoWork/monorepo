#!/bin/sh

mkdir certs
cd certs

openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 -days 3650 \
  -subj '/CN=*.localhost' -extensions EXT -config <(printf "$(cat localhost.ext)")
