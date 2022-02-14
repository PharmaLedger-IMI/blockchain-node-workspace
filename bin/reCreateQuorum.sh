#!/bin/bash -x
date
echo "Downing containers"
docker-compose down
sleep 3
echo "Raising containers"
docker-compose up -d
date