const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8').split('\n');

// console.log(data)

let containedPairs = 0;
while (data.length) {
    const assignmentPairs = data.shift().split(',').join('-').split('-');
    const first = [parseInt(assignmentPairs[0]), parseInt(assignmentPairs[1])];
    const second = [parseInt(assignmentPairs[2]), parseInt(assignmentPairs[3])];

    if (first[0] <= second[0] && first[1] >= second[1]) {
        console.log('first contains second!')
        console.log(first, second);
        containedPairs += 1;
        // break;
    } else if (first[0] >= second[0] && first[1] <= second[1]) {
        console.log('second contains first!')
        console.log(first, second);
        containedPairs += 1;
        // break;
    }
}

console.log(containedPairs)