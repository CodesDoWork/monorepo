ARG DOCKER_PROXY


ARG DOCKER_DELUAN__NAVIDROME_VERSION=0.59.0
FROM ${DOCKER_PROXY}deluan/navidrome:${DOCKER_DELUAN__NAVIDROME_VERSION}

RUN adduser --disabled-password navidrome

RUN mkdir -p /data
RUN chown -R navidrome:navidrome /data
RUN mkdir -p /music
RUN chown -R navidrome:navidrome /music

USER navidrome
