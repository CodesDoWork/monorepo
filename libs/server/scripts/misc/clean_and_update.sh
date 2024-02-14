docker compose -f /home/jkonratt/server/docker-compose.yml exec docker-registry registry garbage-collect /etc/docker/registry/config.yml --delete-untagged=true

docker image prune -af
docker volume prune -af
docker network prune -f

apt-get -y autoremove
apt-get -y update
apt-get -y upgrade
apt-get -y clean
