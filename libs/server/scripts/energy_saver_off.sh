docker compose -f /home/jkonratt/server/docker-compose.yml pull
docker compose -f /home/jkonratt/server/docker-compose.yml up -d

apt-get -y autoremove
apt-get -y update
apt-get -y upgrade
apt-get -y clean
