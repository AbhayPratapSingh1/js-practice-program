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

function alternativeWordBuffer(word){
  let outputBuffer = word[0];
  
  for (let index = 1; index < word.length; index++){
    const char = word[index];
    const lastCharInBuffer = outputBuffer[outputBuffer.length - 1];
    outputBuffer += isBothVowelAndConsonent(char, lastCharInBuffer) ? char : "";
  }

  return outputBuffer;
}

function nonUsedCharacters(usedChars, allChars){
  let unusedChar = "";
  let usedCharIndex = 0;
  for (let index = 0; index < allChars.length; index++){
    const char = allChars[index];

    unusedChar += usedChars[usedCharIndex] !== char ? char : "";
    usedCharIndex += usedChars[usedCharIndex] !== char ? 0 : 1;
  }
  return unusedChar;
}


function spltitWords(word) {
  let outputBuffer = "";
  let unusedChar = word;
  while (unusedChar !== ""){
    const newAlternativeWord = alternativeWordBuffer(unusedChar);

    outputBuffer += outputBuffer === "" ? newAlternativeWord : "," + newAlternativeWord
    
    unusedChar = nonUsedCharacters(newAlternativeWord, unusedChar);
  }

  return outputBuffer;
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
  
  testSplittingWord("aaaeee","a,a,a,e,e,e")
  testSplittingWord("aaabbb","ab,ab,ab")

  testSplittingWord("rhythm","r,h,y,t,h,m")
  testSplittingWord("aeiou","a,e,i,o,u")

  testSplittingWord("beautiful","betiful,a,u")
}

testAllCases();
