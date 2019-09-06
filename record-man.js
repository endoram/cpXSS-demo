
const fs = require('fs');
const pathMod = require('path');

function createMultipleFiles(parent, files) {
    let promises = [];
    for (let i = 0; i < files.length; i++) {
        let filePath = pathMod.join(parent, files[i]);
        promises.push(new Promise((resolve, reject) => {
            fs.writeFile(filePath, '', 'utf8', err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                } 
            });
        }));
    }
    return Promise.all(promises);
}

class RecordManager {
    constructor(recordsPath) {
        this.path = recordsPath;
        console.log('creating record manager');
    }
    doesSeedExist(seed) {
        console.log(`checking if seed ${seed} exists`);
        return new Promise((resolve, reject) => {
            fs.access(pathMod.join(this.path, seed), fs.constants.F_OK | fs.constants.W_OK, err => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        console.log('seed does not exist');
                        resolve(false);
                    } else {
                        reject(err);
                    }
                } else {
                    console.log('seed exists');
                    resolve(true);
                }
            });
        });
    }
    createSeed(seed) {
        console.log(`creeating seed ${seed}`);
        let seedPath = pathMod.join(this.path, seed);
        return new Promise((resolve, reject) => {
            fs.mkdir(seedPath, {
                recursive: true
            }, err => {
                if (err) {
                    return reject(err);
                }
                console.log('made directory for seed');
                resolve(['username.txt', 'password.txt', 'misc.txt']);
            });
        })
        .then(files => createMultipleFiles(seedPath, files));
    }
    addRecordToFile(record, targetPath) {
        console.log('add record to file');
        return new Promise((resolve, reject) => {
            fs.readFile(targetPath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`before: ${data}, after: ${record.value}`);
                    fs.writeFile(targetPath, record.value, 'utf8', err => {
                        console.log('wrote');
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }
    addRecord(record) {
        let seed = record.seed;
        let targetFile = (record.target === 'username' || record.target === 'password' ? record.target : 'misc') + '.txt';
        let targetPath = pathMod.join(this.path, seed, targetFile);
        return this.doesSeedExist(seed)
            .then(exists => {
                if (exists) {
                    console.log('adding record to file');
                    return this.addRecordToFile(record, targetPath);
                } else {
                    return this.createSeed(seed)
                        .then(() => {
                            console.log('done creating record');
                            return this.addRecordToFile(record, targetPath);
                        });
                }
            });
    }
}

module.exports = RecordManager;
