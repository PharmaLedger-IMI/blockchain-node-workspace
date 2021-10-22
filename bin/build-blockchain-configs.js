const tempFolder = 'tmp';

const argParser = function(defaultOpts, args){
    let config = JSON.parse(JSON.stringify(defaultOpts));
    if (!args)
        return config;
    args = args.slice(2);
    const recognized = Object.keys(config);
    const notation = recognized.map(r => '--' + r);
    args.forEach(arg => {
        if (arg.includes('=')){
            let splits = arg.split('=');
            if (notation.indexOf(splits[0]) !== -1) {
                let result
                try {
                    result = eval(splits[1]);
                } catch (e) {
                    result = splits[1];
                }
                config[splits[0].substring(2)] = result;
            }
        }
    });
    return config;
}

const defaultOps = {
    name: "blockchain"
}

const conf = argParser(defaultOps, process.argv);

const fs = require('fs');
const path = require('path');

const readFile = function(filePath){
    let data;
    try {
        console.log(`Reading file: `, filePath);
        data = fs.readFileSync(filePath);
    } catch (e) {
        throw new Error(`Could not read file from ${filePath} - ${e.message}`);
    }
    return data.toString();
}

const writeFile = function(data, filePath){
    try {
        console.log(`Writing updated file to: `, filePath);
        fs.writeFileSync(filePath, data);
    } catch (e) {
        throw new Error(`Could not write to ${filePath} - ${e.message}`);
    }
}

const filePaths = [
    `configs${path.sep}blockchain-config-template.json`,
    `configs/${path.sep}docker-compose-template.yml`
];

const handleDir = function(dir){
    const dirname = path.dirname(dir);
    if (!fs.existsSync(dirname))
        handleDir(dirname);
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir);
}

const handleFile = function(filePath){
    let data = readFile(filePath);

    Object.keys(conf).forEach(k => {
        console.log(`Updating file config with ${k} to ${conf[k]}`);
        data = data.replace(new RegExp("\\\$\\\{" + k + "\\\}", 'gm'), conf[k]);
    });

    const outPath = filePath.replace(/configs\//g, tempFolder + path.sep).replace(/-template/g, '');

    handleDir(path.dirname(outPath));
    writeFile(data, outPath);
}

const banner = function(){
    console.log(`---------------------------------------`);
    console.log(`Deploying a blockchain with parameters:`);
    Object.keys(conf).forEach(k => console.log(`# ${k} = ${conf[k]}`));
    console.log(`---------------------------------------`);
}

banner();
filePaths.forEach(handleFile);

console.log(`Updated Config files are available under the ${tempFolder} folder`);





