let currentTerm = 1;
const lastTerm = 100;
let sum = 0;


while (currentTerm <= lastTerm){
  console.log("Current Term is : ", currentTerm);
  sum += currentTerm
  currentTerm += 1
}

console.log("Sum of all Term is : ", sum)
