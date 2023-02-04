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

const FileSystem = {
  '/': {
    'a': {
      'e': {
        'i': 0
      },
      'f': 0,
      'g': 0,
      'h.lst': 0
    },
    'b.txt': 0,
    'c.dat': 0,
    'd': {
      'j': 0,
      'd.log': 0,
      'd.ext': 0,
      'k': 0
    }
  }
}

function getFileSize(file) {
  return file.size;
}

function getDirectorySize(dir) {
  let size = 0;
  let dirKeys = Object.keys(dir);

  for (let i of dirKeys) {
    if (typeof i === 'object') {
      console.log('dir');
      break;
    }
    console.log('file')
  }
}







return;











const { inspect } = require('util');

const fs = require('fs');
const inputData = fs.readFileSync('input.txt', 'UTF-8').split('\n');

const pathArray = [];
let sizeTable = {
  '/': 0,
};

console.table(inputData)

let cmd = '';

while (inputData.length) {

  const input = inputData.shift().split(' ');

  if (input[0] === '$') {
    cmd = input[1];
  }

  if (cmd === 'cd') {

    if (input[2] !== '..') {
      pathArray.push(input[2]);
    } else {
      pathArray.pop();
    }

    // console.log(cmd, input);
    // console.log('path', pathArray)
  } else if (cmd === 'ls') {

    let dirName = '';
    let fileSize = 0;

    const currentDir = pathArray[pathArray.length - 1];

    if (input[0] === 'dir') {

      dirName = input[1];

      if (!sizeTable[dirName]) {
        sizeTable[dirName] = 0;
      }

    } else {
      fileSize = parseInt(input[0]);
      // if (sizeTable[currentDir]) {
      //   sizeTable[currentDir] = sizeTable[currentDir] + fileSize;
      // }
      sizeTable[currentDir] = sizeTable[currentDir] + fileSize || fileSize;
    }

    // console.log(cmd, input);
  }


}

console.log(sizeTable)