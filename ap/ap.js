let firstTerm = 1;
const apDifference = 2;
const totalNoOfTerms = 10;

let currentTermCount = 0
let sum = 0;

while (currentTermCount < totalNoOfTerms){
  sum += firstTerm;
  firstTerm += apDifference;
  currentTermCount += 1;
}

console.log("sum of the ap is : ", sum);
