FROM alpine:3.20.3

COPY ./apps/music/playlist-creator/create_playlists.sh /create_playlists.sh
RUN chmod +x /create_playlists.sh

ENTRYPOINT ["/create_playlists.sh"]
CMD ["/music"]
