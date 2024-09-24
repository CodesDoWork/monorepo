FROM registry:2.8.3

ENV REGISTRY_AUTH_TOKEN_ROOTCERTBUNDLE=/opt/certs/trustChain.pem
COPY /src/docker-registry/trustChain.pem $REGISTRY_AUTH_TOKEN_ROOTCERTBUNDLE
