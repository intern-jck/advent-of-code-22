/*
- / (dir)
  - a (dir)
    - e (dir)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)
  - d (dir)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)
*/
const { inspect } = require('util');

const fs = require('fs');
const inputData = fs.readFileSync('test.txt', 'UTF-8').split('\n');

// class Tree {
//   constructor(type) {
//     let node = new Node(type);
//     this._root
//   }
// }

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
  }

  *systemTraverse(node = this.root) {
    yield node;
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.systemTraverse(child);
      }
    }
  }

  createFile(type, name, size, parent) {
    // const file = new Node(type, name, size);
    console.log(type, name, size, parent)
    for (let node of this.systemTraverse()) {
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

console.log(sys);



const sysOutput = inspect(sys, {
  depth: null,
  colorize: true,
  // sorted: true
})

console.log(sysOutput);