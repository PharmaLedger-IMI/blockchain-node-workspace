To add new files you need to:
1. edit ../bin/build-blockchain-configs.js and add the file to the filePaths array.
2. edit ../octopus.json and copy the file to the appropriate target before starting the service
3. run `npm run freeze` to update octopus-freeze.json
