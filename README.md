# monorepo

This is a nx monorepo for most of the development of CodesDoWork.
See the [docs](./docs) for more detailed information about this repo.

## LICENSE

The root [`LICENSE`](./LICENSE) applies to all packages unless explicitly stated in a package's directory.

## Tools

This monorepo uses nx as framework to manage the packages.
Natively, it uses typescript, but python was added for some projects.

### TS

To install the dependencies run `pnpm install` or `ni` (when `@antfu/ni` is installed).

### Python

- Create a virtual environment: `python -m venv .venv` and activate it:
  `source .venv/bin/activate` or `.venv\Scripts\activate` (Windows).
- To install the dependencies run `pip install -r requirements.txt`
- To create the `requirements.txt` file from `requirements.in`, run `pip-compile requirements.in` (`pip-tools` needed).
