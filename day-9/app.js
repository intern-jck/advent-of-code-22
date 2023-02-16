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
    console.log(direction, steps);
    // Part 1
    // Move head one step for each number of steps
    for (let i = 0; i < steps; i++) {

        // Iterate over an array of knots
        const head = rope[0];
        head.move(direction);
        console.log('head @', head.getPosition());

        for (let i = 1; i < rope.length; i++) {
            const knot = rope[i];
            const prevKnot = rope[i - 1];

            // for (let i of rope) {
            //     console.log(i.name, i.getPosition())
            // }

            const knotDistance = knot.getDistance(prevKnot);
            console.log(knotDistance);

            if (knotDistance > maxDistance) {
                console.log('move knot', knot.name)
                const newLoc = prevKnot.getPath()[1];
                console.log('move to :', newLoc);
                knot.moveTo(newLoc);
            }
            console.log('knot @', knot.getPosition());

            console.log('\n');
        }
    }
}

// Log number of steps tail has made.
// console.log(Object.keys(tail.visited).length, tail.getPath().length);
const tail = rope[rope.length - 1];

console.log(tail.getPath().length);
