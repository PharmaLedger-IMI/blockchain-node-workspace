const fs = require('fs');
const path = require('path');

const tempFolder = 'tmp';
const networkFolder = 'network';
const patchFolder = `patches${path.sep}network`;



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
    `${tempFolder}${path.sep}docker-compose.yml`
];

const getOutputPath = function(filePath){
    const fileName = path.basename(filePath);
    const getDirectories = source =>
        fs.readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

    const name = getDirectories(networkFolder)[0]
    return networkFolder + path.sep + name + path.sep + fileName;
}

const handleFile = function(filePath){
    let data = readFile(filePath);
    const outPath = getOutputPath(filePath);
    writeFile(data, outPath);
}

const getPatchFiles = function(){
    return fs.readdirSync(patchFolder, {withFileTypes: true})
        .filter(f => !f.isDirectory() && f.isFile())
        .map(f => `${patchFolder}${path.sep}${f.name}`)
}

filePaths.push(...getPatchFiles());

const banner = function(){
    console.log(`-------------------------------`);
    console.log(`Patching network docker-compose`);
    console.log(`-------------------------------`);
}

banner();
filePaths.forEach(handleFile);

console.log(`network Docker compose patched`);






