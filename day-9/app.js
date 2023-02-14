const fs = require('fs');
const inputData = fs.readFileSync('input.txt', 'utf-8').split('\n');

class Knot {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.path = [];
        this.pathLength = 0;
        this.visited = {};
    };

    getCurrentPosition() {
        const pos = this.path.slice().pop();
        if (pos) {
            return pos;
        }
        return [this.x, this.y];
    };

    getPreviousPosition() {
        const pos = this.path.slice()[this.path.length - 2];
        return pos;
    };

    getPath() {
        return this.path.slice();
    };

    move(dir) {
        switch (dir) {
            case 'L':
                this.x--;
                break;
            case 'R':
                this.x++;
                break;
            case 'U':
                this.y++;
                break;
            case 'D':
                this.y--;
                break;
        }
        this.markVisited(this.x, this.y);
        this.path.push([this.x, this.y]);
    };

    moveTo(x, y) {
        this.x = x;
        this.y = y;
        this.markVisited(this.x, this.y);
        this.path.push([this.x, this.y]);
    };

    getDistance(knot) {
        const xDistance = (knot.x - this.x);
        const yDistance = (knot.y - this.y);
        const distance = Math.sqrt(xDistance ** 2 + yDistance ** 2);
        return distance;
    };

    markVisited(x, y) {
        const posKey = `${x}-${y}`;

        if (this.visited[posKey]) {
            this.visited[posKey]++;;
            return;
        }

        this.visited[posKey] = 1;
        return;
    }

};

const head = new Knot();
const tail = new Knot();

const maxDistance = Math.sqrt(2);

// Move knots based on input
for (let i = 0; i < inputData.length; i++) {

    // Parse each line into a direction and number of steps.
    const input = inputData[i].split(' ');
    const direction = input[0];
    const steps = input[1];

    // Move head one step for each number of steps
    for (let i = 0; i < steps; i++) {

        head.move(direction);

        const headCurrent = head.getCurrentPosition();
        const headPrevious = head.getPreviousPosition();
        const headDistance = head.getDistance(tail);

        if (headDistance > maxDistance) {
            tail.moveTo(headPrevious[0], headPrevious[1])
        }

        const tailCurrent = tail.getCurrentPosition();
        // console.log(headCurrent, tailCurrent);

    }

}

// console.table(tail.getPath());
// console.table(head.getPath());

// console.log(tail.visited, head.visited);

console.log(Object.keys(tail.visited).length);