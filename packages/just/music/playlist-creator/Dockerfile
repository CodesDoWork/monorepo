FROM alpine:3.20.3
ARG APP_DIR=just/music/playlist-creator

RUN apk add --no-cache bash

COPY ./packages/$APP_DIR/create_playlists.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/create_playlists.sh

ENTRYPOINT ["create_playlists.sh"]
CMD ["/music"]
