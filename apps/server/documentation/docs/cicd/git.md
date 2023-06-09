# Git

The git service is provided by
<a href="https://gitea.io" target="_blank" rel="noopener noreferrer">Gitea</a>.
See its docs <a href="https://docs.gitea.io" target="_blank" rel="noopener noreferrer">here</a>.

## URL

You can reach this service via https://git.localhost.

## Backups

The `git` container has volumes for its data and config:

- `git-config`
- `git-data`

These volumes are backed up via the [backup-service](../services/backups)
