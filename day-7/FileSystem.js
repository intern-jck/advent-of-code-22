const treeify = require('treeify');

// Each file in the system can be seen as a node
class File {
    constructor(type, name, size = 0) {
        this.type = type;
        this.name = name;
        this.size = size;
        this.children = this.type === 'dir' ? [] : null;
    };

    get nodeInfo() {
        return {
            name: this.name,
            type: this.type,
            size: this.size,
            children: this.children,
        };
    };

};

class FileSystem {

    constructor() {
        this.root = new File('dir', 'root');
        this.pathArray = ['root'];
    }

    pwd() {
        console.log('pwd:', '/' + this.pathArray.reverse().join('/'));
    }

    cd(dir) {
        if (!dir) {
            return;
        }
        if (dir === '/') {
            this.pathArray = ['root'];
        } else if (dir === '..') {
            this.pathArray.shift();
        } else if (typeof dir === 'string') {
            this.pathArray.unshift(dir);
        }
    }

    ls(dir) {
        if (dir === '/') {
            console.log(this.root)
        }
    }

    touch(type, name, size, dir) {
        const file = new File(type, name, size);
        if (dir === 'root' || dir === undefined) {
            this.root.children.push(file);
            return true;
        }

        for (let node of this.preOrderTraversal()) {
            if (node.name === dir) {
                node.children.push(file);
                return true;
            }
        }
        return false;
    }

    // Generator
    getDir(dirName) {
        for (let node of this.preOrderTraversal()) {
            if (node.name === dirName) {
                return node;
            }
        }
        return undefined;
    }

    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.type === 'file') {
            return;
        }
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.preOrderTraversal(child);
            }
        }
    }

    // getDirSize(dirName) {
    //     const dir = this.getDir(dirName);
    //     console.log(dir.name, 'has:');

    //     for (let child of dir.children) {
    //         console.log(child.name, child.size)
    //         if (child.type === 'dir') {
    //             this.getDirSize(child.name);
    //         }
    //     }

    //     // function addBT(root) {
    //     //     if (root == null) {
    //     //         return 0;
    //     //     }
    //     //     return (root.key + addBT(root.left) + addBT(root.right));
    //     // }

    //     return (dir.size + );
    // }

    getDirSize(dir) {
        if (dir.children) {
            dir.children.forEach((child) => {
                dir.size += this.getDirSize(child);
            });
        }
        return dir.size;
    }

    showFS() {
        return treeify.asTree(this.root, true);
    }

};

module.exports = { FileSystem };
