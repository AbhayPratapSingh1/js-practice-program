const sample1 = "LZ"        // 0
const sample1b = " LZ"        // 0
const sample2 = "Z L"       // 1
const sample3 = "L     Z"   // 5
const sample4 = "L     L"   // -1
const sample5 = "Z   Z   Z" // -1
const sample6 = "L  ZL Z"   // 0
const sample7 = ""          // 0
const sample8 = "LZ  L Z"   // 2

const sampleCase = sample1b;
let spaceBetween = -1;

let lastAnimal = "";
let secondLastAnimal = "";

let sampleIteratorIndex = 0;


if (sampleIteratorIndex < sampleCase.length && sampleCase[sampleIteratorIndex] !== " "){
  secondLastAnimal = lastAnimal
  lastAnimal = sampleCase[sampleIteratorIndex];
}
sampleIteratorIndex += 1


if (sampleIteratorIndex < sampleCase.length && sampleCase[sampleIteratorIndex] !== " "){
  secondLastAnimal = lastAnimal
  lastAnimal = sampleCase[sampleIteratorIndex];
  if ( secondLastAnimal !== "" && lastAnimal !== secondLastAnimal){
    spaceBetween = spaceBetween + 1;
  }
}
sampleIteratorIndex += 1



if (sampleIteratorIndex < sampleCase.length && sampleCase[sampleIteratorIndex] !== " "){
  secondLastAnimal = lastAnimal
  lastAnimal = sampleCase[sampleIteratorIndex];
  if ( secondLastAnimal !== "" && lastAnimal !== secondLastAnimal){
    spaceBetween = spaceBetween + 1;
  }
}
sampleIteratorIndex += 1



const output = spaceBetween;
console.log(output);
