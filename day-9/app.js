const fs = require('fs');
const inputData = fs.readFileSync('test.txt', 'utf-8').split('\n');
const { Knot } = require('./Knot.js');

const maxDistance = Math.sqrt(2);

const numKnots = 2;
const rope = [];

for (let i = 0; i < numKnots; i++) {
    const knot = new Knot(i.toString());
    rope.push(knot);
}


// Part 1
// Move knots based on input
for (let i = 0; i < inputData.length; i++) {
    // Parse each line into a direction and number of steps.
    const input = inputData[i].split(' ');
    const direction = input[0];
    const steps = input[1];
    // Part 1
    // Move head one step for each number of steps
    for (let i = 0; i < steps; i++) {
        // Iterate over an array of knots
        const head = rope[0];
        head.move(direction);

        // Update rest of rope
        for (let i = 1; i < rope.length; i++) {
            const knot = rope[i];
            const prevKnot = rope[i - 1];
            const knotDistance = knot.getDistance(prevKnot);
            if (knotDistance > maxDistance) {
                const newLoc = prevKnot.getPath()[1];
                knot.moveTo(newLoc);
            }
        }
    }
}

// Log number of steps tail has made.
// console.log(Object.keys(tail.visited).length, tail.getPath().length);
const tail = rope[rope.length - 1];

console.log(tail.getPath().length);
console.log(Object.keys(tail.visited).length);

