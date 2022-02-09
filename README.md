# blockchain-node-workspace

This repository :
* Depends on https://github.com/PharmaLedger-IMI/quorum-docker.git to setup a GoQuorum private network
* Depends on https://github.com/PharmaLedger-IMI/ethadapter.git for the ETH smart contract
* Depends on https://github.com/PharmaLedger-IMI/epi.git for the ethadapter docker image.

It is suitable for developers experimenting with OpenDSU blockchain anchoring. **It is not suitable for production**.

## Pre-requesites

1. Same as in https://github.com/ConsenSys/quorum-dev-quickstart#prerequisites (and has not been tested on Windows, so far).

2. Needs curl on the executable path.

3. The node version documented here is 14, but it could possibly work on 16. Not tested.


## 1st Time Installation and Startup

available configuration:
 - name: defaults to 'blockchain'

```
nvm use 14
git clone https://gitlab.pdmfc.com/pharmaledger/blockchain-node-workspace.git
cd blockchain-node-workspace
npm install
npm run config-blockchain -- --name=bdnsdomain
npm run deploy-blockchain
```

(Replace "bdnsdomain" with the bdns domain name to be served by this ethadapter - NOT ACTUALLY USED FOR ANYTHING FOR NOW).

When the build-all finishes, it will leave several docker containers running.
- quorumengineering/quorum x 4 - Geth/instanbul nodes using a local IPv4 bridge network qbn-net 172.16.16.*/24
- web3labs/epirus-free-*,nginx,mongo - ethereum explorer available on port 8700  (also available on https://www.web3labs.com/epirus-explorer)
- ethadapter - from ePi workspace - exposed on port 3000

**WARNING:** Only run this once. If you repeat the `npm run deploy-blockchain` the smart contract will be deployed again at a different address, the ethAdapter will be re-configured for that address and will not be able to see any previous hashes. (So you will loose access to previous anchors.)

## Starting up for the 2nd Time

```
npm run start-blockchain
```

## Stopping

```
npm run stop-blockchain
```

Stopping does not looses data. (Several docker external volumes where created on the 1st-time installation, and these will keep the required data between stop/start).

## Remove and release space for the docker images, volumes and network

Must execute the "Stopping" procedure first.

Then run:
```
docker container prune
docker volume prune
docker network prune
```

**Use with care:** If that does not work, the following will stop and remove all docker images on your system (even from other workspaces):

```
docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
```

Eliminate ALL docker volumes (even from other workspace):
```
docker volume rm $(docker volume ls -q)
```

Then eliminate unused image space and networks.

```
docker system prune -af
docker network prune -f
```
