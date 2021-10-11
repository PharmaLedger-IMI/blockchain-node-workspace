# blockchain-node-workspace

This repository :
* uses goquorum wizard to setup a local ETH node (with 4 nodes, cakeshop, txmanager, etc...)
* It then uses https://github.com/PharmaLedger-IMI/ethereum-anchoring.git to setup anchoring services

## Pre-requesites

https://docs.goquorum.consensys.net/en/stable/Tutorials/Quorum-Dev-Quickstart/Using-the-Quickstart/#prerequisites


## 1st Time Installation and Startup

```
nvm use 14
git clone https://gitlab.pdmfc.com/pharmaledger/blockchain-node-workspace.git
cd blockchain-node-workspace
npm install
npm run build-all
```

When the build-all finishes, it will leave several docker containers running.

## Starting up for the 2nd Time

```
nvm use 14
cd blockchain-node-workspace
npm run build-all # only needed if you deleted the docker images
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
