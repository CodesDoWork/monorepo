SERVER_DIR=/home/jkonratt/server
COMPOSE_FILE=$SERVER_DIR/docker-compose.yml
DOCKER_LOGIN_FILE=$SERVER_DIR/docker-registry/.login
DOCKER_REGISTRY=justin.konratts.de
DOCKER_REGISTRY_SERVICE=docker-registry

docker compose -f $COMPOSE_FILE up -d --pull always --wait $DOCKER_REGISTRY_SERVICE
tail -1 $DOCKER_LOGIN_FILE | docker login $DOCKER_REGISTRY --username $(head -1 $DOCKER_LOGIN_FILE) --password-stdin
docker compose -f $COMPOSE_FILE --profile always --profile day up -d --pull always
docker compose -f $COMPOSE_FILE exec $DOCKER_REGISTRY_SERVICE registry garbage-collect /etc/docker/registry/config.yml --delete-untagged=true

docker image prune -af
docker volume prune -af

apt-get -y autoremove
apt-get -y update
apt-get -y upgrade
apt-get -y clean
