const fs = require('fs');
const inputData = fs.readFileSync('test.txt', 'UTF-8').split('\n');

const field = [];
const visible = [];

for (let i in inputData) {

  const input = inputData[i].split('');

  const visibleLine = [];
  const inputLine = [];

  for (let j in input) {
    visibleLine.push(false);
    inputLine.push(parseInt(input[j]));
  }

  field.push(inputLine);
  visible.push(visibleLine);
}

function visibleLeft(tree, index, row) {
  if (index === 0) {
    return true;
  }
  for (let i = index - 1; i >= 0; i--) {
    if (tree <= row[i]) {
      return false;
    }
    return true;
  }
}

function visibleRight(tree, index, row) {
  if (index === row.length - 1) {
    return true;
  }
  for (let i = index + 1; i < row.length; i++) {
    if (tree <= row[i]) {
      return false;
    }
    return true;
  }
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

for (let i = 0; i < field.length; i++) {
  for (let j = 0; j < field[i].length; j++) {

    const tree = field[i][j];
    const treeRow = field[i];
    const treeColumn = getColumn(j, field);
    console.log(treeRow, treeColumn)

    for (let i = 0; i < treeRow.length; i++) {
      if (visibleLeft(tree, i, treeRow) || visibleRight(tree, i, treeRow)) {
        visible[i][j] = true;
      }
    }

  }
}

console.log(field, visible);
