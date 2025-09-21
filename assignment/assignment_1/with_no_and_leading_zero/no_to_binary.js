
const mainNo = 66 

let base = 1
let noToExtractBit = mainNo
let mainNoBinary = 0

while (noToExtractBit > 0){
  const bit = (noToExtractBit % 2) + 2 // to convert 0 -> 2 , 1-> 3
  mainNoBinary = (bit*base) + mainNoBinary
  noToExtractBit = (noToExtractBit - (bit -  2) )/2
  base = base*10
}


console.log(mainNoBinary)
