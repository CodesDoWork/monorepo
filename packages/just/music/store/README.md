# just-music-store

This node application monitors music libs and stores the files in a store directory.

## Features

- Monitors directories passed in the env variable `MUSIC_LIB_DIRS`.
- Normalizes audio files using `r128gain`.
- Hard links audio files to a store directory.
- On removal, removes the file from the store if no other file is hard linked to it.
- On change, updates the filename in the store.
- Cleans the store from dead links or duplicates on startup.
- Removes duplicate store files with the same inode after ingestion, keeping only the last ingested
  store file.

## Env variables

- `MUSIC_STORE_DIR` - The store directory.
- `MUSIC_LIB_DIRS` - Comma separated list of directories to monitor. The paths may be relative or
  absolute.

## System Requirements

- `r128gain`
- `ffmpeg`
