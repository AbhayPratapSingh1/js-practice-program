
function isVowel(character) {
  switch(character){
    case "a":
      return true;
      
    case "e":
      return true;

    case "i":
      return true;

    case "o":
      return true;

    case "u":
      return true;
  }
  return false;
}

function isBothVowelAndConsonent(char, char2){
  return isVowel(char) !== isVowel(char2);
}

function addCommaBetweenWords(word){
  let resultBuffer = "";
  for (let index = 0; index < word.length; index++){
    resultBuffer += "," + word[index];
  }
  return resultBuffer;
}

function spltitWords(word) {
  
  let processingWord = word;
  let resultWordBuffer = word[0];
  let unused = word;

  unused = "";
  for (let wordIndex = 1; wordIndex < processingWord.length; wordIndex++){
    const lastCharAdded = resultWordBuffer[resultWordBuffer.length - 1];
    const charToAdd = isBothVowelAndConsonent(processingWord[wordIndex], lastCharAdded) ? processingWord[wordIndex] : "";
    resultWordBuffer += charToAdd

    const unUsedCharToAdd = charToAdd === "" ? processingWord[wordIndex] : "";
    unused += unUsedCharToAdd;
  }

  const suffixOfResultBuffer = addCommaBetweenWords(unused);
  return resultWordBuffer + suffixOfResultBuffer;
}

function testSplittingWord(word, expected) {
  const result = spltitWords(word);

  const icon = result === expected ? "✅" : "❌";

  let message ="\t" + icon + " [ Word : " + word + "]";
  message += "\n\t   Acutal : " + result + " | Expected : " + expected + "\n";
  console.log(message);
}

function testAllCases() {
  console.log("")
  testSplittingWord("apepele", "apepele");
  testSplittingWord("apepelek", "apepelek");
  testSplittingWord("pepele", "pepele");

  testSplittingWord("appe", "ape,p");
  testSplittingWord("apple", "ape,p,l");
  testSplittingWord("apple", "ape,p,l");
  testSplittingWord("there", "tere,h");
  testSplittingWord("hello", "helo,l");
  testSplittingWord("abyss", "ab,y,s,s");
  testSplittingWord("this", "tis,h");
  
}

testAllCases();
