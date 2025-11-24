ARG DOCKER_PROXY

FROM $DOCKER_PROXY/deluan/navidrome:0.58.5

RUN adduser --disabled-password navidrome

RUN mkdir -p /data
RUN chown -R navidrome:navidrome /data
RUN mkdir -p /music
RUN chown -R navidrome:navidrome /music

USER navidrome
