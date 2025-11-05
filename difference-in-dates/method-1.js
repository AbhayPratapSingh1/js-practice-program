function isLeapYear(year) {
  if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
    return year !== 0;
  }
  return false;
}

function getDaysInMonth(month, year) {

  const monthString = (month + "").padStart(2, 0);
  const monthWith31 = "01,03,05,07,08,10,12";
  const monthWith30 = "04,06,09,11";
  if (monthWith31.includes(monthString)) {
    return 31;
  }
  if (monthWith30.includes(monthString)) {
    return 30;
  }
  return isLeapYear(year) ? 29 : 28;
}

function getDay(date) {
  return parseInt(date.slice(0, 2));
}

function getMonth(date) {
  return parseInt(date.slice(3, 5));
}

function getYear(date) {
  return parseInt(date.slice(6, 10));
}

function getDateDifference(date1, date2) {
  const day1 = getDay(date1)
  const day2 = getDay(date2)
  const month1 = getMonth(date1)
  const month2 = getMonth(date2)
  const year1 = getYear(date1)
  const year2 = getYear(date2)

  const delta = day2 - day1;

  const dayCountThisMonth = month2 > month1 || year1 !== year2 ? getDaysInMonth(month1, year1) + delta : delta;

  return dayCountThisMonth;
}

function getYearDifference(date1, date2) {
  const year1 = getYear(date1);
  const year2 = getYear(date2);
  let totalDays = 0;

  for (let yearNo = year1 + 1; yearNo < year2; yearNo++) {
    totalDays = totalDays + 365 + (isLeapYear(yearNo) ? 1 : 0);
  }

  return totalDays;
}

function monthDayStarting(month, year) {
  let days = 0;
  for (let currentMonth = month + 1; currentMonth < 13; currentMonth++) {
    days += getDaysInMonth(currentMonth, year);
  }
  return days;
}
function monthDayEnding(month, year) {
  let days = 0;

  for (let currentMonth = 1; currentMonth < month; currentMonth++) {
    days += getDaysInMonth(currentMonth, year);
  }

  return days;
}

function daysInBetweenMonth(month1, month2, year) {
  let days = 0
  for (let currentMonth = month1 + 1; currentMonth < month2; currentMonth++) {

    days += getDaysInMonth(currentMonth, year)
  }
  return days
}

function getMonthDifference(date1, date2) {
  const year1 = getYear(date1);
  const month1 = getMonth(date1);

  const year2 = getYear(date2);
  const month2 = getMonth(date2);

  const days = year2 > year1
    ? monthDayStarting(month1, year1) + monthDayEnding(month2, year2)
    : daysInBetweenMonth(month1, month2, year1);

  return days;
}


function differenceInTwoDates(date1, date2) {

  const yearDifference = getYearDifference(date1, date2);
  const monthDifference = getMonthDifference(date1, date2);
  const dateDiff = getDateDifference(date1, date2);
  return yearDifference + dateDiff + monthDifference;
  // return 0;
}

function testCase(type, date1, date2, expected) {
  const actual = differenceInTwoDates(date1, date2);
  const isPass = actual === expected;
  const icon = isPass ? "✅" : "❌";
  let message = `\t${icon} ${type}\n`;

  message += isPass ? "" : `\t   | Input    : \"${date1}\",\"${date2}\" \n`;
  message += isPass ? "" : `\t   | Actual   : ${actual}\n`;
  message += isPass ? "" : `\t   | Expected : ${expected}\n`;

  console.log(message);
}

function testAllTestCases() {
  console.log('');
  testCase("Same Day", "15-06-2023", "15-06-2023", 0);
  testCase("Short Span (Same Month)", "01-10-2025", "10-10-2025", 9);
  testCase("Short Span (Across Months)", "28-02-2023", "03-03-2023", 3);
  testCase("Short Span (Across Years)", "31-12-2024", "02-01-2025", 2);
  testCase("Non-Leap Year (Full Year)", "01-01-2023", "01-01-2024", 365);
  testCase("Simple Leap Year Check", "01-01-2024", "01-01-2025", 366);
  testCase("Leap Day Included", "01-02-2024", "01-03-2024", 29);
  testCase("Leap Day Excluded", "01-03-2024", "01-04-2024", 31);
  testCase("Multi-Year Span (No Leap)", "01-01-2001", "01-01-2003", 730);
  testCase("Multi-Year Span (One Leap)", "01-01-2003", "01-01-2005", 731);
  testCase("Century Non-Leap Year", "01-01-1899", "01-01-1901", 730);
  testCase("Century Leap Year", "01-01-1999", "01-01-2001", 731);
  testCase("Cross-Century Span (No Leap)", "31-12-1899", "01-01-1901", 366); // 1900 is NOT a leap year
  testCase("Cross-Century Span (Leap)", "31-12-1999", "01-01-2001", 367); // 2000 IS a leap year
  testCase("Long Span (From Year 1)", "01-01-0001", "31-12-0001", 364);
  testCase("Original Example Match", "01-01-0001", "01-03-0002", 424);
  testCase("Full Month (Feb Non-Leap)", "01-02-2026", "28-02-2026", 27);
  testCase("Full Month (March)", "01-03-2026", "31-03-2026", 30);
  testCase("Short, Reverse Leap", "28-02-2024", "01-03-2024", 2);
  testCase("Ten Year Span", "01-01-2010", "01-01-2020", 3652);

  testCase("Short, Reverse Leap (CORRECTED)", "28-02-2024", "01-03-2024", 2);


  testCase("Spanning Two Leap Years", "01-01-2003", "01-01-2009", 2192); // (6 * 365) + 2 leap days = 2192

}

testAllTestCases()
