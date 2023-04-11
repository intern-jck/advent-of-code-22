const fs = require('fs');
const inputData = fs.readFileSync('test.txt', 'UTF-8').split('\n');
const { FileSystem } = require('./FileSystem.js');
// console.log(FileSystem.pwd())
// return;
const myfs = new FileSystem();

// Build file system based on text input
for (let i in inputData) {
    const input = inputData[i].split(' ');
    console.log(input)

    let cmd = '';

    if (input[0] === '$') {
        cmd = input[1];
    }

    if (cmd === 'cd') {
        myfs.cd(input[2]);
        // console.log(myfs.pathArray)
    }

    if (cmd === 'ls') {
        if (input[0] === 'dir') {
            myfs.touch('dir', input[1]);
        } else {
            myfs.touch('file', input[0], input[1], myfs.pathArray[0]);
        }
    }
}

console.log(myfs.showFS());