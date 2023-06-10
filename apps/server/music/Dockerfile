FROM codesdowork/monorepo-private/base AS base
FROM codesdowork/monorepo-private/workspace AS workspace


FROM deluan/navidrome:latest

RUN adduser --disabled-password navidrome

RUN mkdir -p /data
RUN chown -R navidrome:navidrome /data
RUN mkdir -p /music
RUN chown -R navidrome:navidrome /music

USER navidrome
