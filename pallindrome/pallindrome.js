const inputString = "abcba"
let isPallidrome = false


// reverse the string and compare it
let reverseString = ""
let currentIteratingIndex = 0
while (currentIteratingIndex < inputString.length){
  reverseString = inputString[currentIteratingIndex] + reverseString
  currentIteratingIndex += 1
}


// compare the string
if (inputString === reverseString){
  isPallidrome = true
}


// Printing the Outputs
const outputSuffix = isPallidrome? "is Pallidrome":"is not Pallidrome"
console.log(inputString,outputSuffix)
