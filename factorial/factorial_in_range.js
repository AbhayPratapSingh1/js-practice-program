let limit = 100;

let factorial ;
let iterator ;

for (let input = 1; input<=limit; input++){
  factorial = 1;
  iterator = input
  while (iterator > 0){
    factorial = factorial * iterator
    iterator -= 1
  }
  console.log("Factorial of",input, "is",factorial)
}

