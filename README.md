# blockchain-node-workspace

This repository :
* uses goquorum wizard (https://docs.goquorum.consensys.net/en/stable/Tutorials/Quorum-Dev-Quickstart/Using-the-Quickstart/) and **needs the same pre-requesites** to setup a local ETH node (with 4 nodes, cakeshop, txmanager, etc...)
* It then uses https://github.com/PharmaLedger-IMI/ethereum-anchoring.git to setup anchoring services

```
npm install
npm run build-all
```

When the build-all finishes, it will leave several docker containers running.
