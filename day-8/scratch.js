

console.log('count left')
const leftCount = countVisibleLeft(tree, j, treeRow);
console.log('count right')
const rightCount = countVisibleRight(tree, j, treeRow);
console.log('count up')
const upCount = countVisibleLeft(tree, i, treeColumn);
console.log('count down')
const downCount = countVisibleRight(tree, i, treeColumn);

console.log(i, j, tree, leftCount, rightCount, upCount, downCount, treeColumn)
const treeCount = leftCount * rightCount * upCount * downCount;

scenicScores[i][j] = treeCount;
if (treeCount > maxTreeCount) {
    lin
    maxTreeCount = treeCount;
}

// console.table(scenicScores);
// console.log(maxTreeCount)
console.log('\n');



let visibleTrees = 0;

for (let i in visible) {
    for (let j in visible[i]) {
        if (visible[i][j] === true) {
            visibleTrees += 1;
        }
    }
}

console.table(field);
console.table(scenicScores);
// console.log(maxTreeCount)


// console.log(tree, treeRow, treeColumn);
// const isVisibleLeft = visibleLeft(tree, j, treeRow);
// const isVisibleRight = visibleRight(tree, j, treeRow);
// const isVisibleUp = visibleLeft(tree, i, treeColumn);
// const isVisibleRDown = visibleRight(tree, i, treeColumn);
// console.log(isVisibleLeft, isVisibleRight, isVisibleUp, isVisibleRDown)
// if (isVisibleLeft || isVisibleRight || isVisibleUp || isVisibleRDown) {
//   visible[i][j] = true;
// }




