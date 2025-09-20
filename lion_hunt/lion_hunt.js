const sample1 = "LZ"        // 0
const sample2 = "Z L"       // 1
const sample3 = "L     Z"   // 5
const sample4 = "L     L"   // -1
const sample5 = "Z   Z   Z" // -1
const sample6 = "L  ZL Z"   // 0
const sample7 = ""          // 0
const sample8 = "LZ  L Z"   // 2

const sampleCase = sample1;
const spaceBetween = -1;

let firstAnimal = "";
const sampleIteratorIndex = 0;

if (sampleCase[sampleIteratorIndex] !== " "){
  firstAnimal = sampleCase[sampleIteratorIndex];
}


console.log("Animal :", firstAnimal)

const output = spaceBetween;
console.log(output);
