const sample1 = "LZ"        // 0
const sample1b = " LZ"        // 0
const sample1c = "     LZ"        // 0
const sample2 = "Z L"       // 1
const sample2b = " Z L"       // 1
const sample2c = "  Z L"       // 1
const sample3 = "L     Z"   // 5
const sample4 = "L     L"   // -1
const sample5 = "Z   Z   Z" // -1
const sample6 = "L  ZL Z"   // 0
const sample7 = ""          // -1
const sample8 = "LZ  L Z"   // 0

const sampleCase = sample8;


let shortesPath = -1
let currentPath = -1
let lastAnimal = ""

for (let sampleIteratingIndex = 0; sampleIteratingIndex < sampleCase.length; sampleIteratingIndex ++){
  
  if (sampleCase[sampleIteratingIndex] === " "){
    if (lastAnimal !== "") {
      currentPath += 1
    }
  }
  else if(lastAnimal ===""){
    lastAnimal = sampleCase[sampleIteratingIndex]
  }
  
  else{
    if(sampleCase[sampleIteratingIndex] !== lastAnimal){
      currentPath += 1;
      shortesPath = (shortesPath > currentPath || shortesPath === -1)? currentPath: shortesPath
      currentPath = -1
      lastAnimal = sampleCase[sampleIteratingIndex]
    }
    else {
      currentPath = -1
    }
  }
}


console.log(shortesPath)
