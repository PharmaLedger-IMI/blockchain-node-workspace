cd blockchain-explorer

docker-compose pull
docker-compose -f docker-compose.yml -f docker-compose-quorum.yml up -d
