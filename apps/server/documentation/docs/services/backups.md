# Backups

The project contains a `backup-service` folder containing snapshots and configuration files for
the backup service as well as an api for the `admin-frontend`.

## Environment

| Variable | Description                       | Default   |
|----------|-----------------------------------|-----------|
| PORT     | Port to run the fastify server on | 5555      |
| HOST     | Host address to listen on         | localhost |

## What is backed up

- Service configs and data via mounted docker volumes → `/data/services`
- Important PC data via mounted docker volumes → `/data/pc`

### Planned but not implemented yet

- Data from `Notion` via downloads with `NodeJS` → `/data/notion`, `/data/drive`

> These features were planned, but the efforts to implement them seem unreasonably high.

## How it works

The `backup-service` container has
<a href="https://rsnapshot.org/" target="_blank" rel="noopener noreferrer">rsnapshot</a> istalled,
which is used to create the backups.
It creates alpha, beta, gamma and delta updates based on cron jobs configured inside the
<a href="">root</a> file.
The <a href="">rsnapshot.conf</a> file contains all the configuration used for rsnapshot itself.

Alpha updates are made most, while delta updates are made least.
The snapshots are tagged with a number. 0 is the newest snapshot and the higher the number,
the older the snapshot.

Snapshots are stored inside the <a href="">.snapshots</a> directory.

## How to restore

In case you need to restore a backup, follow these steps:

1. Mount a directory on your pc into the `backup-service` container under `/data`
2. Run the container and check that the directory is mounted correctly
3. Copy a snapshot of your choice (or parts of it) to the mounted folder to override data inside
   the `/data` directory and therefore the volumes.

## URL

This service is private for the `admin frontend`.

## API

OpenApi/Swagger documentation is coming soon when
<a href="https://github.com/jlalmes/trpc-openapi/issues/87" target="_blank" rel="noopener noreferrer">this issue</a>
is closed.
