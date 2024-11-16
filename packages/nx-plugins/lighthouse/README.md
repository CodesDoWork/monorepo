# nx-plugins-lighhthouse

A plugin to provide lighthouse tasks and executors to run performance tests.
It starts the target service using `docker compose` and runs a lighthouse container in the same network to run the
tests.

It defines the tasks by using a `.lighthouserc.json` file:

```json
{
  "urls": ["http://website:${PORT}", "${URL}"]
}
```

It takes a list of urls, which support the use of env variables of a `.env` file located in the project dir.
