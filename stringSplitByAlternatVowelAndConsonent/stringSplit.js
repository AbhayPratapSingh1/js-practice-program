
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

function removeFirstChar(word){
  let resultBuffer = "";
  for (let index = 1; index < word.length; word++){
    resultBuffer += word[index];
  }
  return resultBuffer
}


function spltitWords(word) {
  
  let processingWord = word;
  let resultWordBuffer = "";
  let unused = word;
  
  while (unused !== ""){
    processingWord = unused;
    unused = ""

    let currentBuldingWord = processingWord[0];
    
    for (let wordIndex = 1; wordIndex < processingWord.length; wordIndex++){

      const lastCharAdded = currentBuldingWord[currentBuldingWord.length - 1];
      const charToAdd = isBothVowelAndConsonent(processingWord[wordIndex], lastCharAdded) ? processingWord[wordIndex] : "";
      
      currentBuldingWord += charToAdd;
  
      const unUsedCharToAdd = charToAdd === "" ? processingWord[wordIndex] : "";
      unused += unUsedCharToAdd;
    
    }

    resultWordBuffer += resultWordBuffer === "" ?  currentBuldingWord : "," + currentBuldingWord;

  }

  return resultWordBuffer;
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
}

testAllCases();
