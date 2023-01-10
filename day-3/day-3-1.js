const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8').split('\n');

let allEven = true;
let prioritySum = 0;

// const priorityValues = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

console.log('A'.charCodeAt(0))
console.log('Z'.charCodeAt(0))
console.log('a'.charCodeAt(0))
console.log('z'.charCodeAt(0))


while (data.length) {
    const item = data.shift();

    // compartments 1 and 2
    const comp1 = item.substring(0, item.length / 2);
    const comp2 = item.substring(item.length / 2);
    // console.log(comp1)
    // console.log(comp2)

    // for each item type
    for (let i in comp1) {
        if (comp2.includes(comp1[i])) {
            console.log('found:', comp1[i], comp1.charCodeAt(i))
            const itemValue = comp1.charCodeAt(i);
            if (itemValue >= 97 && itemValue <= 122) {
                prioritySum += itemValue - 96;
            } else if (itemValue >= 65 && itemValue <= 90) {
                prioritySum += itemValue - 64 + 26;
            }
            break;
        }
    }
}

console.log('sum', prioritySum)