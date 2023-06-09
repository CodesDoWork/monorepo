# Git

This server provides a
<a href="https://www.sonarsource.com/products/sonarqube/" target="_blank" rel="noopener noreferrer">SonarQube</a>
service.
See its docs <a href="https://docs.sonarqube.org/latest/" target="_blank" rel="noopener noreferrer">here</a>.

## URL

You can reach this service via https://sonarqube.ci.localhost.

## Backups

The `sonarqube` container has volumes for its data and config:

- `sonarqube-config`
- `sonarqube-data`
- `sonarqube-extensions`

These volumes are backed up via the [backup-service](../services/backups)
