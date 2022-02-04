# blockchain-node-workspace

This repository :
* Depends on https://github.com/PharmaLedger-IMI/quorum-docker.git to setup a GoQuorum private network
* Depends on https://github.com/PharmaLedger-IMI/ethereum-anchoring.git for anchoring services

It is suitable for developers experimenting with OpenDSU blockchain anchoring. **It is not suitable for production**.

## Pre-requesites

1. Same as in https://github.com/ConsenSys/quorum-dev-quickstart#prerequisites (and has not been tested on Windows, so far).



## 1st Time Installation and Startup

available configuration:
 - name: defaults to 'blockchain'

```
nvm use 14
git clone https://gitlab.pdmfc.com/pharmaledger/blockchain-node-workspace.git
cd blockchain-node-workspace
npm install
npm run config-blockchain -- --name=template
npm run deploy-blockchain
```

When the build-all finishes, it will leave several docker containers running.

## Starting up for the 2nd Time

```
nvm use 14
cd blockchain-node-workspace
npm run deploy-blockchain # only needed if you deleted the docker images
npm run node-start
```

## Stopping

```
npm run node-stop
```

## Remove and release space for the docker images and network

Must execute the "Stopping" procedure first.

**Use with care:** These lines will remove all unused docker images and networks on your system.

```
docker system prune -af
docker network prune -f
```
