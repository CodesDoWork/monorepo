FROM registry:2.8.3

ENV REGISTRY_AUTH_TOKEN_ROOTCERTBUNDLE=/opt/certs/trustChain.pem
COPY /packages/just/docker-registry/config.yaml /etc/docker/registry/config.yml
COPY /packages/just/docker-registry/trustChain.pem $REGISTRY_AUTH_TOKEN_ROOTCERTBUNDLE
