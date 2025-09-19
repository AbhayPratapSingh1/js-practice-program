const factorialCandidate = 8;

let factorial = 1;
let multiplier = 1

while (factorialCandidate >= multiplier){
  factorial = factorial * multiplier
  multiplier += 1
}
console.log("Factorial of",factorialCandidate, "is",factorial)
