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

    if (addMoves && inputData[i]) {
        // moves.push(inputData[i].split(' '));
        const moveRaw = inputData[i].split(' ');
        const move = {
            amount: parseInt(moveRaw[1]),
            from: parseInt(moveRaw[3]),
            to: parseInt(moveRaw[5])
        };
        moves.push(move)
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

const dataStacksObj = {};
const dataStacksArr = [[], [], [], []];

const stackNums = dataToRotate[dataToRotate.length - 1];

for (let i = dataToRotate.length - 2; i >= 0; i--) {
    const dataRow = dataToRotate[i];

    for (let j in dataRow) {
        const stackNum = stackNums[j];

        if (dataStacksObj[stackNum] && dataRow[j]) {
            dataStacksObj[stackNum].push(dataRow[j]);
        } else if (dataRow[j]) {
            dataStacksObj[stackNum] = [dataRow[j]]
        }
    }

    const stack = [];
    for (let j in dataRow) {
        const stackNum = stackNums[j];
        if (dataRow[j]) {
            dataStacksArr[stackNum].push(dataRow[j])
        }
    }
}

// Verify data and moves
// console.table(dataStacksObj)
console.table(dataStacksArr)
// console.log(moves)


// Now loop through moves and adjust data
for (let i in moves) {
    console.log(moves[i])
    let counter = 0;
    while (counter < moves[i].amount) {
        const elementToMove = dataStacksArr[moves[i].from].pop();
        console.log('moving', elementToMove)
        dataStacksArr[moves[i].to].push(elementToMove);
        counter += 1;
    }
}

console.table(dataStacksArr)
