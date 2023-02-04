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
    - k (fie, size=7214296)
*/

// Rules
// For each key-value pair in FileSystem,
// if typeof value === object, value is a directory
// if typeof value === interger, value is a file
// To get file size of directory,
// traverse object and for each directory,
// sum the sizes of each file.
// Directory sizes are inclusive with everything inside each directory.

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
const pathArray = ['/', 'a'];

// Create empty file system with '/' as default root.
const FileSystem = {
    '/': {
        size: 0,
        'a': {
            size: 1
        }
    }
};

const sys = {
    '/': {
        size: 0,
        'a': {
            size: 1
        }
    }
}

// Change current directory
function cd(path, dir) {
    // Assume dir is a string
    if (dir === '..') {
        path.pop();
    } else {
        path.push(dir);
    }
}

// List contents for current directory.
function ls(dir, path) {
    const _path = path.slice();
    if (_path.length === 0) {
        console.log(dir)
        return dir;
    }
    return ls(dir[_path.shift()], _path);
}

// Get size of current directory.
function getDirSize(dir, path) {
    const _path = path.slice();
    if (_path.length === 0) {
        return dir.size;
    }
    return getDirSize(dir[_path.shift()], _path);
}

// Increment the size of current directory by given amount.
function incDirSize(dir, path, amt) {
    const _path = path.slice();
    if (_path.length === 0) {
        dir.size += amt ? amt : 0;
        return;
    }
    return incDirSize(dir[_path.shift()], _path, amt);
}

// Create a file in FileSystem
function touch(dir, name, path, size) {
    // console.log(`Create file ${name} @ ${path} w\ ${size}`);
    const _path = path.slice();
    if (_path.length === 0) {
        dir[name] = size;
        incDirSize(sys, path, size);
        return;
    }
    return touch(dir[_path.shift()], name, _path, size);
}

// Create a dir in FileSystem
function mkdir(dir, name, path) {
    const _path = path.slice();
    if (_path.length === 0) {
        dir[name] = {
            size: 0
        };
        return;
    }
    return mkdir(dir[_path.shift()], name, _path);
}

// console.log('path', pathArray)
// getDirSize(FileSystem, pathArray);

// incDirSize(FileSystem, pathArray, 0);

// console.log('path', pathArray)
// getDirSize(FileSystem, pathArray);

console.log('path', pathArray)
// touch(FileSystem, 'f', pathArray, 29116);
// touch(FileSystem, 'g', pathArray, 2557);
touch(FileSystem, 'h.lst', pathArray, 62596);
ls(sys, pathArray);

mkdir(sys, 'e', pathArray);
ls(sys, pathArray);

cd(pathArray, 'e');

console.log('path', pathArray)
ls(sys, pathArray);

cd('/');
ls('/');