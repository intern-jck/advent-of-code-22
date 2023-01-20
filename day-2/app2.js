const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');
const plays = data.split('\n');


const scoreTable = {
  'X': 1,
  'Y': 2,
  'Z': 3
};


let totalScore = 0;

// 2nd part
// X === lose
// Y === draw
// Z === win


const getWinner = (play) => {
  if (play === 'A') {
    return 'Y';
  } else if (play === 'B') {
    return 'Z';
  } else if (play === 'C') {
    return 'X';
  }
}

const getDraw = (play) => {
  if (play === 'A') {
    return 'X';
  } else if (play === 'B') {
    return 'Y';
  } else if (play === 'C') {
    return 'Z';
  }
}

const getLost = (play) => {
  if (play === 'A') {
    return 'Z';
  } else if (play === 'B') {
    return 'X';
  } else if (play === 'C') {
    return 'Y';
  }
}



for (let i in plays) {

    const play = plays[i].split(' ');

    // get winner, draw, lost
    if (play[1] === 'Z') {
        totalScore += scoreTable[getWinner(play[0])] + 6;
    } else if (play[1] === 'Y') {
        totalScore += scoreTable[getDraw(play[0])] + 3;
    } else if (play[1] === 'X') {
        totalScore += scoreTable[getLost(play[0])];
    }
    
}

console.log(totalScore);
