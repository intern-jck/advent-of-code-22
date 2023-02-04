
// console.log(input);
const input = inputData.shift().split(' ');
// console.log(input)
const lsOutput = [];

if (input[0] === '$') {
    cmd = input[1];
}

if (cmd === 'cd') {
    if (input[2] !== '..') {
        curDir.push(input[2]);
    } else {
        curDir.pop();
    }
    console.log(curDir, input)
} else if (cmd === 'ls') {
    console.log(curDir, input)
    // lsOutput.push(input)
    // if (fileSystem[curDir]) {
    // }
}


//  ________________________


const currentNode = null;
const currentDir = [];

const cmdList = [];
const fileList = [];
let cmd = '';

console.log(cmdList);

// Each file in the system can be seen as a node
class Node {
    constructor(type, name, size = 0, parent = null) {
        this.type = type;
        this.name = name;
        this.size = size;
        this.parent = parent;
        this.children = [];
    }

    get nodeInfo() {
        console.log('NODE', this.name, this.type, this.size, this.content);
        return [this.name, this.type, this.size, this.content]
    }

    get isDir() {
        return type === 'dir' ? true : false;
    }
}

class FileSystem {
    constructor(type, name) {
        this.root = new Node(type, name);
        this.currentDirectory = '';
    }

    *searchDirectory(node = this.root) {
        yield node;
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.searchDirectory(child);
            }
        }
    }

    createFile(type, name, size, parent) {
        console.log(type, name, size, parent);
        for (let node of this.searchDirectory()) {
            if (node.name === parent) {
                node.children.push(new Node(type, name, size, node));
                return true;
            }
        }

        return false;
    }

}

const sys = new FileSystem('dir', '/');

sys.createFile('dir', 'a', 0, '/');

// Log system map to console
const sysOutput = inspect(sys, {
    depth: null,
    colorize: true,
    // sorted: true
})

console.log(sysOutput);

