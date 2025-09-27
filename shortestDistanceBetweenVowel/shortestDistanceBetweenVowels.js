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

function isShortestDistance(firstIndex, lastIndex, shortestDistance){
  if (firstIndex === -1) {
    return false;
  }
  return shortestDistance === -1 || shortestDistance > (lastIndex - firstIndex)
}

function shortestDistance(word){
  let shortestDistance = -1;
  let lastVowelIndex = -1;

  for (let index = 0; index < word.length; index++){
    if (isVowel(word[index])){
      shortestDistance = isShortestDistance(lastVowelIndex, index, shortestDistance) ? index - lastVowelIndex : shortestDistance;
      lastVowelIndex = index;
    }
  }
  
  return shortestDistance;
}

function testShortestDistance(word, expected){
  const result = shortestDistance(word);

  const icon = result === expected ? "✅" : "❌";

  let message ="\t" + icon + " [ Word : " + word + "]";
  message += "\n\t   Acutal : " + result + " | Expected : " + expected + "\n";
  console.log(message);
}

function testAll(){
  console.log();
  testShortestDistance("hello", 3);
  testShortestDistance("apple", 4);
  testShortestDistance("strenghth", -1);
  testShortestDistance("beautiful", 1);
  testShortestDistance("abyss", -1);
}

testAll();
