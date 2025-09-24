
// Split Pattern in a string
function stringSpliter(data, pattern){
  let updatedString = "";
  let lastWord = "";
  let breakMatch = "";

  const dataStringLength = data.length
  const splitingStringLength = pattern.length
  
  for (let eachCharIndex = 0; eachCharIndex < dataStringLength; eachCharIndex++){
    if (data[eachCharIndex] === pattern[breakMatch.length]){
      breakMatch += data[eachCharIndex] 
    }

    else{
      if (breakMatch.length > 0){
        if (data[eachCharIndex] === pattern[0]){
          lastWord += breakMatch
          breakMatch = data[eachCharIndex] 
        }
        else{
          lastWord += breakMatch + data[eachCharIndex]
          breakMatch = ""
        }
      }
      else{
        lastWord += data[eachCharIndex];
        breakMatch = "";
      }
    }

    if (breakMatch.length === splitingStringLength){
      updatedString += lastWord
      if (breakMatch !== pattern){
        updatedString += breakMatch;
      }
      let addingNextLine = eachCharIndex + 1 === dataStringLength || lastWord === "" ? "":"\n";
      updatedString += addingNextLine
      lastWord = "";
      breakMatch = "";
    }
  }
  updatedString += lastWord + breakMatch;
  return updatedString
}



console.log(stringSpliter("abcbcacds", "bc"))





