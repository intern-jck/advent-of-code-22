class Knot {

    constructor(name) {
        this.name = name;
        this.x = 0;
        this.y = 0;
        this.path = [];
        this.pathLength = 0;
        this.visited = {};
    };

    // getCurrentPosition() {
    //     const pos = this.path.slice().pop();
    //     if (pos) {
    //         return pos;
    //     }
    //     return [this.x, this.y];
    // };

    // getPreviousPosition() {
    //     const pos = this.path.slice()[this.path.length - 2];
    //     return pos;
    // };

    getPosition() {
        return [this.x, this.y];
    }

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
        this.path.unshift([this.x, this.y]);
    };

    moveTo(pos) {
        this.x = pos[0];
        this.y = pos[1];
        this.markVisited(this.x, this.y);
        this.path.unshift([this.x, this.y]);
    };

    getDistance(knot) {
        const xDistance = (knot.x - this.x);
        const yDistance = (knot.y - this.y);
        const distance = Math.sqrt(xDistance ** 2 + yDistance ** 2);
        return distance;
    };

    markVisited(x, y) {
        // Store position as a string key formatted as: 'xpos-ypos: number-of-times-vistied'.
        // EX: { '0-1': 2}
        const posKey = `${x}-${y}`;
        if (this.visited[posKey]) {
            this.visited[posKey]++;;
            return;
        }
        this.visited[posKey] = 1;
        return;
    }

};


module.exports = { Knot };