function shortestDistance(word){
  return 3;
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
