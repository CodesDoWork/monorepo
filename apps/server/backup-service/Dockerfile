FROM lscr.io/linuxserver/rsnapshot

COPY --chmod=111 ./healthcheck.sh /
HEALTHCHECK CMD /healthcheck.sh

COPY ./config /config
