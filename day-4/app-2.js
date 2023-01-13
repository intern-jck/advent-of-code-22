const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8').split('\n');
// console.log(data.length)
let overlapPairs = 0;

while (data.length) {

    const assignmentPairs = data.shift().split(',').join('-').split('-');
    const first = [parseInt(assignmentPairs[0]), parseInt(assignmentPairs[1])];
    const second = [parseInt(assignmentPairs[2]), parseInt(assignmentPairs[3])];

    // check if first contains second
    if (first[0] <= second[0] && first[1] >= second[1]) {
        overlapPairs += 1;
    }
    // check if second contains first
    else if (second[0] <= first[0] && second[1] >= first[1]) {
        overlapPairs += 1;
    }
    // check if first overlaps second in the beginning
    else if (first[0] <= second[0] && first[1] >= second[0]) {
        overlapPairs += 1;
    }
    // check if first overlaps second at the end
    else if (first[0] <= second[1] && first[1] >= second[1]) {
        overlapPairs += 1;
    }
}

console.log(overlapPairs)
