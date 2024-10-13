FROM alpine:3.20.3

RUN apk add --no-cache bash

COPY ./src/music/playlist-creator/create_playlists.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/create_playlists.sh

ENTRYPOINT ["create_playlists.sh"]
CMD ["/music"]
