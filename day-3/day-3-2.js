const fs = require('fs');
const data = fs.readFileSync('input.txt', 'UTF-8').split('\n');

let badgeSum = 0;

while (data.length) {
    const item1 = data.shift();
    const item2 = data.shift();
    const item3 = data.shift();

    for (let i in item1) {
        if (item2.includes(item1[i])) {
            if (item3.includes(item1[i])) {
                console.log('found badge', item1[i])
                const badgeValue = item1.charCodeAt(i);
                if (badgeValue >= 97 && badgeValue <= 122) {
                    badgeSum += badgeValue - 96;
                } else if (badgeValue >= 65 && badgeValue <= 90) {
                    badgeSum += badgeValue - 64 + 26;
                }
                break;
            }
        }
    }
}

console.log('sum', badgeSum)
