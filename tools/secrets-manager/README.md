# @codesdowork/nx-secrets-manager

Generates `.env` files from with Bitwarden secrets in nx monorepos.

# Install

````bash
npm i -D @codesdowork/nx-secrets-manager @bitwarden/cli
````

# Usage

## 1. Define a config in your project root (optional):

`.secrets.config.json`

````json
{
  "sever": "https://your-bitwarden-server.url"
}
````

## 2. Create .env.secure.yaml files where necessary (in monorepo root or nx projects)

````yaml
env?:
  NORMAL: variables
  GO: here
secrets?:
  COLLECTION_NAME:
    collectionId: "your-collection-id"
    prefix?: false # if the secret should be prefixed with the collection name (default: false)
    vars:
      - USERNAME
      - PASSWORD
      - OTHER_FIELD
      - name: OTHER_NAMED_FIELD
        field: secret_is_stored_in_field_with_this_name
````

## 3. Create .env files

````bash
nx g env-files [stage] [bw-username] [bw-password]
````

or

````bash
nx g @codesdowork/nx-secrets-manager:env-files [stage] [bw-username] [bw-password]
````

All input parameters can be omitted. They will be asked for when running the command.
When you are already logged in, the username is not needed.
The password input is hidden and can also read from the `BW_PASSWORD` environment variable.
In Bitwarden, have a collection, e.g. `DB`, with credentials named like the stage (e.g. `DEV`, `TEST`, `PROD`).
