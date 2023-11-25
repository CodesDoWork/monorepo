# Server

## Setup

1. Debian
2. Intall packages: `lm-sensors`, `rsync`, `docker`
3. Enable SSH server, disable password login
4. Add docker vm options:
```
sysctl -w vm.max_map_count=262144
sysctl vm.overcommit_memory=1
```
