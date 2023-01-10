const fs = require('fs');

const data = fs.readFileSync('input.txt', 'UTF-8');

const elfFood = data.split('\n');

console.log(elfFood);

let currentElf = 0;
let foodTotal = 0;

let mostFood = 0;
let mostElf = 0;

let amounts = [];

for (let i in elfFood) {

  if (elfFood[i] === '') {
    currentElf += 1;
    console.log('food total:', foodTotal)
    if (foodTotal > mostFood) {
      mostFood = foodTotal;
      mostElf = currentElf;
      amounts.push(mostFood);
    }
    foodTotal = 0;
  }

  if (elfFood[i]) {
    foodTotal += parseInt(elfFood[i]);
    // console.log(parseInt(elfFood[i], 10))
  }

}

console.log('elf:', mostElf, mostFood)


const topThree = amounts.slice(-3);
console.log(topThree)

const topThreeAmount = topThree.reduce((a,b) => (a + b));
console.log(topThreeAmount)
