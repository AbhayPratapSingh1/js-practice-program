const characterIn = (string, character) => { 
  for (let index = 0; index < string.length; index++) {
    if (string[index] === character) {
      return true;
    }
  }

  return false;
}

const isVowel = (character) => { 
  const vowels = "aeiouAEIOU";
  return characterIn(vowels, character);
}

const countVowels = (sentence) => { 
  let count = 0;

  for (let index = 0; index < sentence.length; index++) {
    if (isVowel(sentence[index])) {
      count++;
    }
  }
  return count;
}

const testCountVowels = (word, expected) => { 
  const result = countVowels(word);
  const icon = result === expected ? "✅" : "❌";
  let message = `\t${icon} [${word}]\n\t Actual: ${result}`;
  message += ` Expected: ${expected}\n`;
  console.log(message);
}

const testAllCases = () => { 
  console.log("");
  testCountVowels("", 0);
  testCountVowels("cbcfgh", 0);
  testCountVowels("a", 1);
  testCountVowels("A", 1);
  testCountVowels("aa", 2);
  testCountVowels("aA", 2);
  testCountVowels("hello world", 3);
  testCountVowels("hEllo wOrld", 3);
  console.log("");
}

testAllCases();
