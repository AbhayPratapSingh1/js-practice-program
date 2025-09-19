const noOfPrimeToFound = 1000;

let isCheckingPrime = false;
let currentChecking = 2;
let checkingFactor = 2;

let primeFounds = 0;

while (primeFounds < noOfPrimeToFound){
  if (checkingFactor >  currentChecking/2){
    console.log(primeFounds+1," : ",currentChecking)
    currentChecking += 1
    primeFounds += 1
    checkingFactor = 2
  }
  else if (currentChecking % checkingFactor == 0){
    currentChecking += 1
    checkingFactor = 2
  }
  else{
    checkingFactor += 1
  }
}
