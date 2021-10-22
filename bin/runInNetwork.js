
const path = require('path');
const fs = require('fs')

const networkFolder = 'network';

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
    cmd: "pwd"
}

const conf = argParser(defaultOps, process.argv);

const getNetWorkPath = function(){
    const getDirectories = source =>
        fs.readdirSync(source, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

    const name = getDirectories(networkFolder)[0]
    return networkFolder + path.sep + name;
}

const banner = function(networkPath, command){
    console.log(`-------------------------------`);
    console.log(`Running ${command} in ${networkPath}`);
    console.log(`-------------------------------`);
}

const networkPath = getNetWorkPath();

banner(networkPath, conf.cmd);

const { exec } = require("child_process");

const cmd = `cd ${networkPath} && ${conf.cmd}`

const command = exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

command.stdout.on('data', data => {
    console.log(data)
});

command.stderr.on('data', (data)=>{
    console.error(data);
});







