# blockchain-node-workspace

This repository :
* uses goquorum wizard to setup a local ETH node (with 4 nodes + tm with instanbul consensus protocol, cakeshop, etc... - docker subnet 172.16.63.0/24)
* It then uses https://github.com/PharmaLedger-IMI/ethereum-anchoring.git to setup anchoring services

It is suitable for developers experimenting with OpenDSU blockchain anchoring. **It is not suitable for production**.

## Pre-requesites

https://docs.goquorum.consensys.net/en/stable/Tutorials/Quorum-Dev-Quickstart/Using-the-Quickstart/#prerequisites


## 1st Time Installation and Startup

```
nvm use 14
git clone https://gitlab.pdmfc.com/pharmaledger/blockchain-node-workspace.git
cd blockchain-node-workspace
npm install
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

## Remove and release space for the docker images

Must execute the "Stopping" procedure first.

```
docker system prune -a
```
