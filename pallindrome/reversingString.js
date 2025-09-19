let string1 = "HelloWorld 1"
let reverseString = ""
let currentIteratingIndex = 0
while (currentIteratingIndex < string1.length){
  reverseString = string1[currentIteratingIndex] + reverseString
  currentIteratingIndex += 1
}

console.log(string1," : is string ", "\n"+reverseString, " : is Reverse String");
