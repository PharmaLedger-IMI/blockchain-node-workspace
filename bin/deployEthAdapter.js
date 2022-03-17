function updateEthAdapterConfigMap(){
    const fs = require('fs');
    let ethAdapter = fs.readFileSync('./configs/ethAdapter_template_docker-compose.yml.template').toString();
    const sc = fs.readFileSync('./stages/SmartContracts/AnchoringSCInfo.json',).toString();
    const orgAcc = fs.readFileSync('./stages/OrgAcc/orgAcc.json').toString();



    const scData = JSON.parse(sc);
    const orgAccData = JSON.parse(orgAcc);

    ethAdapter = ethAdapter.replace('%SMARTCONTRACTADDRESS%',scData.contractAddress);
    ethAdapter = ethAdapter.replace('%SMARTCONTRACTABI%',JSON.stringify(scData.abi));
    ethAdapter = ethAdapter.replace('%ORGACCOUNT%',JSON.stringify(orgAccData));



    console.log(ethAdapter);
    fs.writeFileSync('./ethadapter/EthAdapter/docker-compose.yml',ethAdapter);
    console.log('./ethadapter/EthAdapter/docker-compose.yml file generated.')
}

updateEthAdapterConfigMap();
