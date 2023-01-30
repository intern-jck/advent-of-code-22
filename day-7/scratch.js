
// console.log(input);
const input = inputData.shift().split(' ');
// console.log(input)
const lsOutput = [];

if (input[0] === '$') {
    cmd = input[1];
}

if (cmd === 'cd') {
    if (input[2] !== '..') {
        curDir.push(input[2]);
    } else {
        curDir.pop();
    }
    console.log(curDir, input)
} else if (cmd === 'ls') {
    console.log(curDir, input)
    // lsOutput.push(input)
    // if (fileSystem[curDir]) {
    // }
}


//  ________________________


const currentNode = null;
const currentDir = [];

const cmdList = [];
const fileList = [];
let cmd = '';

while (inputData.length) {
    const input = inputData.shift().split(' ');

    if (input[0] === '$') {
        cmd = input[1];
    }

    if (cmd === 'cd') {
        if (input[2] !== '..') {
            currentDir.push(input[2]);
        } else {
            currentDir.pop();
        }
        console.log(currentDir)
    } else if (cmd === 'ls') {

    }

}

console.log(cmdList);
