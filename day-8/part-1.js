const fs = require('fs');
const inputData = fs.readFileSync('input.txt', 'UTF-8').split('\n');

const field = [];
const visible = [];
const scenicScores = [];

let maxTreeCount = 0;

for (let i in inputData) {

  const input = inputData[i].split('');

  const inputLine = [];
  const visibleLine = [];
  const scoreLine = [];

  for (let j in input) {
    inputLine.push(parseInt(input[j]));
    visibleLine.push(false);
    scoreLine.push(0);
  }

  field.push(inputLine);
  visible.push(visibleLine);
  scenicScores.push(scoreLine);
}

function getRow(row, field) {
  return field[row];
}

function getColumn(col, field) {
  const column = [];
  for (let i = 0; i < field.length; i++) {
    column.push(field[i][col]);
  }
  return column;
}

function visibleLeft(tree, index, row) {
  if (index === 0) {
    return true;
  }

  for (let i = index - 1; i >= 0; i--) {
    if (tree <= row[i]) {
      // console.log(row[i], 'blocks', tree);
      return false;
    }
  }
  return true;
}

function visibleRight(tree, index, row) {
  if (index === row.length - 1) {
    return true;
  }
  for (let i = index + 1; i < row.length; i++) {
    if (tree <= row[i]) {
      return false;
    }
  }
  return true;
}

function countVisibleLeft(tree, index, row) {

  if (index === 0) {
    return 0;
  }

  let treeCount = 0;

  for (let i = index - 1; i >= 0; i--) {
    if (tree > row[i]) {
      treeCount += 1;
    }

    if (tree <= row[i]) {
      treeCount += 1;
      return treeCount;
    }
  }

  // return index;
  return treeCount;
}

function countVisibleRight(tree, index, row) {
  if (index === row.length - 1) {
    return 0;
  }

  let treeCount = 0;
  for (let i = index + 1; i < row.length; i++) {

    if (tree > row[i]) {
      treeCount += 1;
    }

    if (tree <= row[i]) {
      treeCount += 1;
      return treeCount;
    }
  }

  return treeCount;
}

for (let i = 0; i < field.length; i++) {

  // console.table(field);
  for (let j = 0; j < field[i].length; j++) {

    // console.log('tree @', i, j)
    const tree = field[i][j];
    const treeRow = field[i];
    const treeColumn = getColumn(j, field);

    // console.log(tree, treeRow, treeColumn)
    const countLeft = countVisibleLeft(tree, j, treeRow);
    const countUp = countVisibleLeft(tree, i, treeColumn);

    const countRight = countVisibleRight(tree, j, treeRow);
    const countDown = countVisibleRight(tree, i, treeColumn);

    // console.log('COUNTS:', 'L:', countLeft, 'U:', countUp, 'R:', countRight, 'D:', countDown)
    const treeCount = countLeft * countUp * countRight * countDown;
    scenicScores[i][j] = treeCount;

    if (treeCount > maxTreeCount) {
      maxTreeCount = treeCount;
    }

  }
  // console.log('\n')
}


// console.table(field);
// console.table(scenicScores);
console.log(maxTreeCount)