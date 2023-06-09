# Teamcity

This server has a
<a href="https://www.jetbrains.com/teamcity/" target="_blank" rel="noopener noreferrer">TeamCity</a>
container set up.
See its docs
<a href="https://www.jetbrains.com/help/teamcity/teamcity-documentation.html" target="_blank" rel="noopener noreferrer">
here</a>.

It automates tasks within the CI/CD pipeline.

## URL

You can reach this service via https://teamcity.ci.localhost.

## Backups

The `teamcity` container has a volume for its data. This `teamcity-data` volume is backed up via
the [backup-service](../services/backups)
