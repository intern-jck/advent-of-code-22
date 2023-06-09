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

// console.log(data)
// return;

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
// return;
// console.table(dataToRotate)

// Rotate data set to build data stacks

const dataStacksObj = {};
const dataStacksArr = [[], [], [], [], [], [], [], [], [], []];

const stackNums = dataToRotate[dataToRotate.length - 1];

for (let i = dataToRotate.length - 2; i >= 0; i--) {
    const dataRow = dataToRotate[i];
    // console.log(dataRow)

    // Store data as an object
    // for (let j in dataRow) {
    //     const stackNum = stackNums[j];

    //     if (dataStacksObj[stackNum] && dataRow[j]) {
    //         dataStacksObj[stackNum].push(dataRow[j]);
    //     } else if (dataRow[j]) {
    //         dataStacksObj[stackNum] = [dataRow[j]]
    //     }
    // }



    for (let j in dataRow) {

        const stackNum = stackNums[j];
        // console.log('stackNum:', stackNums[j])
        // return;
        // console.log(dataRow[i], stackNum)
        if (dataRow[j]) {
            // console.log('data row:', j, data[j])
            dataStacksArr[stackNum].push(dataRow[j])
        }

    }
    // console.log('\n')

}

// Verify data and moves
// console.table(dataStacksArr)
// return;
// console.table(dataStacksArr)s
// console.log(moves)


// Now loop through moves and adjust data
for (let i in moves) {
    // console.log(moves[i])
    let counter = 0;
    while (counter < moves[i].amount) {
        const elementToMove = dataStacksArr[moves[i].from].pop();
        // console.log('moving', elementToMove)
        dataStacksArr[moves[i].to].push(elementToMove);
        counter += 1;
    }
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
