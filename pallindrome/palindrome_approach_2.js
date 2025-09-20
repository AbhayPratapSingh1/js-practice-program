const sampleCase1 = "a"
const sampleCase2 = "abca"
const sampleCase3 = "abcb"
const sampleCase4 = "abcba"
const sampleCase5 = " "
const sampleCase6 = " a a "
const sampleCase7 = "racecar"
const sampleCase8 = ""

const sampleCase = sampleCase5
const sampleLength = sampleCase.length

let isPalindrome = true
let checkIsSame = true
let sampleIteratingIndex = 0;



for( let sampleIteratingIndex = 0; isPalindrome && (sampleIteratingIndex < sampleLength/2); sampleIteratingIndex++){
  const sampleNegativeIndex = sampleLength - sampleIteratingIndex - 1
  checkIsSame = sampleCase[sampleIteratingIndex] === sampleCase[sampleNegativeIndex]
  isPalindrome = checkIsSame? isPalindrome : false
}


const result = isPalindrome ?"is pallindrome": "is not a pallindrome"
console.log(sampleCase, result)
