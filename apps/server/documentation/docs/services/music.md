# Music

The music service is provided by
<a href="https://www.navidrome.org/" target="_blank" rel="noopener noreferrer">Navidrome</a>.
See its docs
<a href="https://www.navidrome.org/docs/" target="_blank" rel="noopener noreferrer">here</a>.

It provides a Spotify-ish web interface that is used to play your own music.

## Structure

The `music` directory contains nothing special but some Navidrome-specific environment variables
and a Dockerfile for a rootless container.

## URL

You can reach this service via https://music.localhost.

## Backups

The `navidrome` container has a volume for its data. This `navidrome-data` volume is backed up via
the [backup-service](backups)
