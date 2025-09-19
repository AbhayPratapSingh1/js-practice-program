let mainNo = 256;
let subString = 10;

// i added the 1 to save the first zero!
let revBinary = 1

let binary = 0
let copyOfMainNo = mainNo
while(copyOfMainNo > 0){
  revBinary = revBinary * 10 + copyOfMainNo%2 
  copyOfMainNo = copyOfMainNo - copyOfMainNo%2
  copyOfMainNo = copyOfMainNo / 2
}

while(revBinary > 0){
  binary = binary*10 + revBinary %10
  revBinary = revBinary - revBinary%10
  revBinary = revBinary / 10
}
binary = (binary - 1)/10
// found binary representation here


let lenOfMainNo = 0
let copyOfBinary = binary

while (copyOfBinary > 0){
  lenOfMainNo += 1
  copyOfBinary = (copyOfBinary -copyOfBinary%10)/10 
}

let lenOfSubString = 0
let moduloFactorForMainString = 1
let copyOfSubString = subString

if (subString === 0){
  moduloFactorForMainString = 10
  lenOfSubString = 1
}
else{
  while (copyOfSubString > 0){
    lenOfSubString += 1
    copyOfSubString = (copyOfSubString -copyOfSubString%10)/10
    moduloFactorForMainString = moduloFactorForMainString * 10 
  }
}



// find lenth of substring
let check = lenOfMainNo - lenOfSubString + 1
let checkRound = 0
let copyCount = 0

copyOfBinary = binary
copyOfSubString = subString
let checkingNumbers = 0

while(checkRound < check){
  checkingNumbers = copyOfBinary % moduloFactorForMainString
  if (checkingNumbers === copyOfSubString){
    copyCount += 1
  }
  copyOfBinary = (copyOfBinary - copyOfBinary%10 ) / 10
  checkRound +=1
}

console.log("main no : ",mainNo);
console.log("Binary : ", binary);
console.log("substring : ",subString);
console.log("No of Repetition : ",copyCount)
