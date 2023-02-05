

// Rules
// For each key-value pair in FileSystem,
// if typeof value === object, value is a directory
// if typeof value === interger, value is a file
// To get file size of directory,
// traverse object and for each directory,
// sum the sizes of each file.
// Directory sizes are inclusive with everything inside each directory.

const treeify = require('treeify');

const FileSystemTest = {
    '/': {
        'a': {
            'e': {
                'i': 584
            },
            'f': 29116,
            'g': 2557,
            'h.lst': 62596
        },
        'b.txt': 14848514,
        'c.dat': 8504156,
        'd': {
            'j': 4060174,
            'd.log': 8033020,
            'd.ext': 5626152,
            'k': 7214296
        }
    }
}

// Push and pop the current dir to use to navigate later.
const pathArray = [];

// Create empty file system with '/' as default root.
const sys = {
    '/': {
        size: 0,
    }
}

// Change current directory
function cd(path, dir) {
    // Assume dir is a string
    if (dir === '/') {
        while (path.length) {
            path.pop();
        }
        path.push(dir);
    } else if (dir === '..') {
        path.pop();
    } else {
        path.push(dir);
    }
}

function treeifySys(sys) {
    return treeify.asTree(sys, true);
}

// List contents for current directory.
function ls(sys, path) {
    const _path = path.slice();
    if (_path.length === 0) {
        console.log(treeifySys(sys))
        return;
    }
    return ls(sys[_path.shift()], _path);
}

// Create a dir in FileSystem
function mkdir(sys, name, path) {
    const _path = path.slice();
    if (_path.length === 0) {
        sys[name] = {
            size: 0
        };
        return;
    }
    return mkdir(sys[_path.shift()], name, _path);
}

// Get dir in FileSystem.
function getDir(sys, path) {
    const _path = path.slice();
    if (_path.length === 0) {
        return sys;
    }
    return getDir(sys[_path.shift()], _path);
}

// Increment the size of current directory by given amount.
function incDirSize(sys, path, amt) {
    const _path = path.slice();
    const _dir = getDir(sys, _path);
    const _amt = parseInt(amt);
    _dir.size += _amt;
    return;
}

function getDirSize(sys, path) {

    const _path = path.slice();
    // console.log(_path)
    let dirSize = 0;

    if (_path.length === 0) {
        // console.log(dirSize);
        return;
    }

    const currentDir = _path.shift();
    dirSize += sys[currentDir].size;
    // console.log(`dir ${currentDir} size: ${dirSize}`);
    return getDirSizeTotal(sys[currentDir], _path);
}

// Create a file in FileSystem
function touch(sys, name, path, size) {
    const _path = path.slice();
    const currentDir = _path[0];
    if (_path.length === 0) {
        sys[name] = size;
        return;
    }
    sys[currentDir].size += size;
    return touch(sys[_path.shift()], name, _path, size);
}

function getSizeToAllocate(dir) {
    let size = 0;

    const keys = Object.keys(dir);
    for (let key of keys) {
        if (dir[key].size <= 100000) {
            // console.log(dir[key].size)
            size += dir[key].size;
        }
        if (typeof dir[key] === 'object') {
            size += getSizeToAllocate(dir[key]);
        }
    }
    // console.log('total', size)
    return size;
}


function getDirsToDelete(dir, minSize) {

    let arr = [];
    function findDir(dir) {
        for (let key in dir) {
            if (typeof dir[key] === 'object') {
                // console.log(key)
                // const dirSize = dir[key].size;
                arr.push(dir[key].size)
                getDirsToDelete(dir[key], minSize);
            }
        }
        // return;
    }

    findDir(dir);

    arr.sort((a, b) => (b - a));
    // console.log(arr)
    return arr;
}


module.exports = {
    cd,
    ls,
    mkdir,
    // getDirSize,
    touch,
    getSizeToAllocate,
    getDirsToDelete
}