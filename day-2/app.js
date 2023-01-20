const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');

const plays = data.split('\n');


// Scoring

// KEY TABLE
/*

PLAY        OPP     YOU POINTS 

ROCK        A       X   1
PAPER       B       Y   2
SCISSOR     C       Z   3

Win     6
Loss    0
Draw    3

Winning
A Y,
B Z,
C X

Draw
A X
B Y
C Z

Loose
A Z
B X
C Y

*/

const checkWinner = (a, b) => {
  if (a === 'A' && b === 'Y') {
      return true;
  } else if (a === 'B' && b === 'Z') {
      return true;
  } else if (a === 'C' && b === 'X') {
      return true;
  } else {
      return false;
  }
}

const checkDraw = (a, b) => {
  if (a === 'A' && b === 'X') {
      return true;
  } else if (a === 'B' && b === 'Y') {
      return true;
  } else if (a === 'C' && b === 'Z') {
      return true;
  } else {
      return false;
  }
}

const checkLost = (a, b) => {
  if (a === 'A' && b === 'Z') {
      return true;
  } else if (a === 'B' && b === 'X') {
      return true;
  } else if (a === 'C' && b === 'Y') {
      return true;
  } else {
      return false;
  }
}

const scoreTable = {
  'X': 1,
  'Y': 2,
  'Z': 3
}

let totalScore = 0;


// 2nd part
// X === lose
// Y === draw
// Z === win


for (let i in plays) {

    const play = plays[i].split(' ');

    if (checkWinner(play[0], play[1])) {
      totalScore += 6 + scoreTable[play[1]];
    } else if(checkDraw(play[0], play[1])) {
      totalScore += 3 + scoreTable[play[1]];
    } else if(checkLost(play[0], play[1])) {
      totalScore += scoreTable[play[1]];
    }

    
}

console.log(totalScore);