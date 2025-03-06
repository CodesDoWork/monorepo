# nx-plugins-vitepress

A plugin to provide vitepress tasks and executors. It defines the targets by using a
`.vitepressrc.json` file, containing the following options:

```json
{
    "docs": "./path/to/docs/relative-to-project-dir",
    "assets": {
        "public": ["../list/of", "../../asset/paths"]
    }
}
```

The assets key are the directories relative to the docs dir. The asset paths are relative to the
project dir.
