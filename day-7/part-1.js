const fs = require('fs');
const inputData = fs.readFileSync('input.txt', 'UTF-8').split('\n');
const myfs = require('./scratch/sys.js');

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

let dirCount = 0;

const root = '/';
const curPath = [];
// Create empty file system with '/' as default root.
const sys = {
  '/': {
    size: 0,
  }
}

const sysTestSize = 48381165;
const aTestSize = 94853;

let cmd = '';

// Build file system based on text input
for (let i in inputData) {

  if (inputData[i] === '<<>>') {
    break;
  }

  const input = inputData[i].split(' ');

  if (input[0] === '$') {
    cmd = input[1];
    if (cmd === 'cd') {
      // Change Directory
      myfs.cd(curPath, input[2]);
    }
  }

  if (cmd === 'ls') {

    if (input[0] === 'dir') {
      const dirName = input[1];
      myfs.mkdir(sys, dirName, curPath);
      dirCount += 1;
    } else if (input[0] !== '$') {
      const fileName = input[1];
      const fileSize = input[0];
      myfs.touch(sys, fileName, curPath, parseInt(fileSize));
    }

  }

}

console.log('end', dirCount)
myfs.cd(curPath, '/');
// myfs.ls(sys, curPath);
// spaceToFree = myfs.getSizeToAllocate(sys);

// console.log('size', spaceToFree)

const amtNeeded = 70000000 - sys[root].size;
console.log(amtNeeded)

const minDir = myfs.getDirsToDelete(sys, amtNeeded, [])
console.table(minDir)