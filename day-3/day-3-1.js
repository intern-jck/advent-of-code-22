const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8').split('\n');

let prioritySum = 0;

// const priorityValues = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Test to see the char code values
console.log('A'.charCodeAt(0))
console.log('Z'.charCodeAt(0))
console.log('a'.charCodeAt(0))
console.log('z'.charCodeAt(0))

while (data.length) {
    const item = data.shift();

    // compartments 1 and 2
    const comp1 = item.substring(0, item.length / 2);
    const comp2 = item.substring(item.length / 2);

    // for each item type,
    for (let i in comp1) {
        // if its in comp2,
        if (comp2.includes(comp1[i])) {
            // get the item value,
            const itemValue = comp1.charCodeAt(i);
            // scale it according to prioritory ordering,
            if (itemValue >= 97 && itemValue <= 122) {
                // then add to sum.
                prioritySum += itemValue - 96;
            } else if (itemValue >= 65 && itemValue <= 90) {
                prioritySum += itemValue - 64 + 26;
            }
            break;
        }
    }
}

// show sum at end.
console.log('sum', prioritySum)