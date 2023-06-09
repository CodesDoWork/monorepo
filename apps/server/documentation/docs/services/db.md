# Database

This server has a database for different services.
It uses
<a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer">PostgreSQL</a>.
See its docs
<a href="https://www.postgresql.org/docs/" target="_blank" rel="noopener noreferrer">here</a>.

## Environment

| Variable          | Description               | Default   |
|-------------------|---------------------------|-----------|
| POSTGRES_DB       | Default Postgres database | undefined |
| POSTGRES_PASSWORD | default postgres password | undefined |
| POSTGRES_USER     | default postgres user     | undefined |

## URL

This services can be reached internally via `http://db:5432`.
