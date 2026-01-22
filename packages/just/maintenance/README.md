# just-maintenance

This package provides a cloudflare worker via wrangler, which shows a maintenance site. **Only
deploy when services are unavailable to indicate the down status. Services will not be when the
worker is running.**

Use the following commands to control the worker after logging in to wrangler:

**deploy**:

```sh
nx deploy-maintenance just-maintenance
```

**delete**:

```sh
nx delete-maintenance just-maintenance
```
