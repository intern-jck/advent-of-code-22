const fs = require('fs');
const inputData = fs.readFileSync('input.txt', 'UTF-8').split('\n');

// get data set and moves set

const data = [];
const moves = [];

let addData = true;
let addMoves = false;

// Parse out the crate info and move list from input data
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

// Rotate data set to build data stacks

const dataStacksArr = [[], [], [], [], [], [], [], [], [], []];
const stackNums = dataToRotate[dataToRotate.length - 1];
for (let i = dataToRotate.length - 2; i >= 0; i--) {
    const dataRow = dataToRotate[i];
    for (let j in dataRow) {
        const stackNum = stackNums[j];
        if (dataRow[j]) {
            dataStacksArr[stackNum].push(dataRow[j])
        }
    }
}

// Now loop through moves and adjust data
for (let i in moves) {
    let counter = 0;
    const moveStack = [];
    while (counter < moves[i].amount) {
        const elementToMove = dataStacksArr[moves[i].from].pop();
        // dataStacksArr[moves[i].to].push(elementToMove);
        moveStack.push(elementToMove);
        counter += 1;
    }
    while (moveStack.length) {
        dataStacksArr[moves[i].to].push(moveStack.pop())
    }
    // dataStacksArr[moves[i].to].push(moveStack);
}
console.table(dataStacksArr)

// Get the top element from each stack
const stacksCount = dataStacksArr.length - 1;
let crates = '';
for (let i = 1; i <= stacksCount; i++) {
    const stackCount = dataStacksArr[i].length - 1;
    const topOfStack = dataStacksArr[i][stackCount]
    crates += topOfStack;
}

console.log(crates)
