function createOrgAcc(){
    const Web3 = require("web3");
    const fs = require('fs');

    const web3 = new Web3('http://ref-quorum-node1:8545'); // your geth

    //create a new account which doesnt have a storekey located in the blockchain node
    const newAccount = web3.eth.accounts.create();
    const orgAccData = {
        privateKey: newAccount.privateKey,
        address: newAccount.address
    }

    let dir = './stages';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    dir = './stages/OrgAcc';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFileSync('./stages/OrgAcc/orgAcc.json',JSON.stringify(orgAccData));
}

createOrgAcc();
