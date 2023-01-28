const fs = require('fs');
const inputData = fs.readFileSync('input.txt', 'UTF-8').split('\n');

/*
  bvwbjplbg vbhsrlpgdmjqwf tvncz: first marker after character 5
  nppdvjthqldpwncqszvftbrmjlhg: first marker after character 6
  nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 10
  zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 11
*/



const packetMarker = [];
const markerLength = 14;

const inputString = inputData[0];

for (let i = 0; i < inputString.length; i++) {

  const packetChar = inputString[i];
  packetMarker.push(packetChar);

  if (packetMarker.length > markerLength) {
    packetMarker.shift();
  }

  console.log(i, packetMarker.join(''), uniquePacket(packetMarker));

  if (uniquePacket(packetMarker) && packetMarker.length === 14) {
    console.log('start @', i + 1, packetMarker.join(''), uniquePacket(packetMarker));
    return;
  }
}






function uniquePacket(array) {
  const packetCheck = {};
  for (let i = 0; i < array.length; ++i) {
    const value = array[i];
    if (packetCheck[value]) {
      return false;
    }
    packetCheck[value] = true;
  }
  return true;
}