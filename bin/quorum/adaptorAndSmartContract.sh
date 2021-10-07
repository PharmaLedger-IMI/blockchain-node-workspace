#!/usr/bin/env bash


cd ../../ethereum-anchoring/SmartContract || exit 1

docker build --no-cache -t anchor_smart -f dockerfile .
docker tag anchor_smart:latest mabdockerid/anchor_smart:latest
#docker push mabdockerid/anchor_smart:latest

cd ../ApiAdaptor || exit 1

docker build --no-cache -t apiadapter -f dockerfile .
docker tag apiadapter:latest mabdockerid/apiadapter:latest
#docker push mabdockerid/apiadapter:latest

