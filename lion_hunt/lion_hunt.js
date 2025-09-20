const sample1 = "LZ"        // 0
const sample1b = " LZ"        // 0
const sample2 = "Z L"       // 1
const sample2b = " Z L"       // 1
const sample2c = "  Z L"       // 1
const sample3 = "L     Z"   // 5
const sample4 = "L     L"   // -1
const sample5 = "Z   Z   Z" // -1
const sample6 = "L  Z    L Z"   // 0
const sample6b = "L  ZL Z"   // 0
const sample7 = ""          // -1
const sample8 = "LZ  L Z"   // 0

const sampleCase = sample5;
let shortestPath = -1
let spaceBetween = -1;

let lastAnimal = "";
let secondLastAnimal = "";


for (let sampleIteratorIndex = 0; sampleIteratorIndex < sampleCase.length; sampleIteratorIndex++){
  if (sampleCase[sampleIteratorIndex] === " " ){
    if (lastAnimal !== ""){
      spaceBetween = spaceBetween + 1
    }
  }
  else{
    secondLastAnimal = lastAnimal
    lastAnimal = sampleCase[sampleIteratorIndex];
    if ( secondLastAnimal !== "" && lastAnimal !== secondLastAnimal){
      spaceBetween = spaceBetween + 1;
      shortestPath = spaceBetween
      spaceBetween = 0
    }
  }
}



const output = shortestPath;
console.log(output);
