const fs = require('fs');
const inputData = fs.readFileSync('test.txt', 'UTF-8').split('\n');

const stacksNumber = 3;


// get data set and moves set

const data = [];
const moves = [];

let addData = true;
let addMoves = false;

for (let i in inputData) {

    if (inputData[i] === '') {
        addData = false;
        addMoves = true;
    }

    if (addData) {
        data.push(inputData[i]);
    }

    if (addMoves) {
        moves.push(inputData[i]);
    }
}

// get data to rotate
const dataToRotate = [];
for (let i in data) {
    const newData = [];
    for (let j = 0; j < data[i].length; j += 4) {
        newData.push(data[i].substring(j, j + 4).trim());
    }
    dataToRotate.push(newData)
}

// console.table(dataToRotate)

// Rotate data set to build data stacks

const dataStacks = {};
const stackNums = dataToRotate[dataToRotate.length - 1];

for (let i = dataToRotate.length - 2; i >= 0; i--) {
    const dataRow = dataToRotate[i];

    for (let j in dataRow) {
        const stackNum = stackNums[j];

        if (dataStacks[stackNum] && dataRow[j]) {
            dataStacks[stackNum].push(dataRow[j]);
        } else if (dataRow[j]) {
            dataStacks[stackNum] = [dataRow[j]]
        }
    }
}

console.table(dataStacks)
console.log(moves)
