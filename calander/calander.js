
function mergeLineAtPos(line1, line2, pos) {
  const lineArray = [line1, line2];
  const merged = lineArray[pos] + lineArray[(pos + 1) % 2];
  return merged;
}

function addToArray(mainArray = [], array) {
  for (let index = 0; index < array.length; index++) {
    mainArray.push(array[index]);
  }
  return mainArray
}

function arrayConcat(array1, array2) {
  let merged = [];
  merged = addToArray(merged, array1);
  merged = addToArray(merged, array2);
  return merged;
}

function mergeArrayWithSpace(array, size, pos = 0) {
  const spacedLine = " ".repeat(size);
  const merged = []
  for (let index = 0; index < array.length; index++) {
    const line = mergeLineAtPos(array[index], spacedLine, pos);
    merged.push(line)
  }
  return merged
}

function generateGapedList(rows, lineSize) {
  const lines = [];
  const line = " ".repeat(lineSize);
  for (let index = 0; index < rows; index++) {
    lines.push(line);
  }
  return lines;
}

function mergeRightCenter(array1, array2) {
  const len1 = array1.length;
  const len2 = array2.length;

  const firstArrPos = len1 > len2 ? 0 : 1;
  const size = array1[0].length;

  const smallArr = len1 > len2 ? array2 : array1;
  const largeArr = len1 > len2 ? array1 : array2;

  const offset = Math.floor(Math.abs(len1 - len2) / 2);
  const delta = Math.abs(len1 - len2) % 2;
  let merged = mergeArrayWithSpace(largeArr.slice(0, offset), size - 2*delta, firstArrPos);

  const equalMerged = mergeRightEqual(largeArr.slice(offset, offset + smallArr.length), smallArr, firstArrPos);
  merged = arrayConcat(merged, equalMerged);

  const endMerged = mergeArrayWithSpace(largeArr.slice(offset  + smallArr.length, largeArr.length), size - delta, firstArrPos);

  return arrayConcat(merged, endMerged);

}

function mergeRightEqual(array1, array2, firstArrPos = 0) {
  const merged = [];
  for (let index = 0; index < array1.length; index++) {

    const line = mergeLineAtPos(array1[index], array2[index], firstArrPos);
    merged.push(line);
  }
  return merged;
}


////////////////////////////////////////////////////////////////////////////
// CALANDER MAIN CODE! 
//////////////////////////////////////////////////////////////////////////// 


const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


function pad(word, len, char = " ") {
  const diff = len - word.length;

  let paddedWord = word.padStart(Math.floor(diff / 2) + word.length, char);
  paddedWord = paddedWord.padEnd(20, char);
  return paddedWord;
}

function getMonth(month) {
  return MONTHS[month - 1];
}

function formateDateWithDay(dates) {

  dates.unshift(DAYS);
  return dates;
}

function addMonthLine(month, lineGrid) {
  const monthName = getMonth(month)

  const monthLine = pad(monthName, 20, " ")
  lineGrid.unshift(monthLine)
  return lineGrid
}

function formatedDate(date, size = 2) {
  const dateAsStr = date + ""
  return dateAsStr.padStart(size);
}

function genStringRows(rows, size = 2) {
  const stringRow = [];
  for (let index = 0; index < rows.length; index++) {
    const strChar = formatedDate(rows[index], size);
    stringRow.push(strChar)
  }
  return stringRow;
}

function mergeRows(grid, gap, size = 3) {
  const newGrid = [];
  for (let index = 0; index < grid.length; index++) {
    const row = genStringRows(grid[index]).join(" ");
    newGrid.push(row);
  }
  return newGrid;
}


const calander = [
  ["", "", "", "", "", "", "1"],
  ["2", "3", "4", "5", "6", "7", "8"],
  ["9", "10", "11", "12", "13", "14", "15"],
  ["16", "17", "18", "19", "20", "21", "22"],
  ["23", "24", "25", "26", "27", "28", "29"],
  ["30", "31", "", "", "", "", ""]
]



function prepareMonth(monthGrid, monthNo = 1) {
  const monthWithDay = formateDateWithDay(monthGrid);
  const rowMergedMonth = mergeRows(monthWithDay);
  const monthWithName = addMonthLine(monthNo, rowMergedMonth);
  return monthWithName;
}
// console.log(prepareMonth(calander))

////////////////////////////////////////////////////////////////////////////
// CALANDER DYA CALCULATING CODE! 
//////////////////////////////////////////////////////////////////////////// 

const DAY_ON_STANDARD_YEAR = 2;
const STANDARD_YEAR = 1501
function isLeapYear(year) {
  if (year === 0) {
    return false;
  }
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

function totalDaysIn(month, year) {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  // console.log("here");

  return ((month - 1) % 7) % 2 === 0 ? 31 : 30
}


function totalLeapInRange(year1, year2) {
  let count = 0;
  const nextFourMultiple = (4 - (year1 % 4)) % 4;
  const nextLeapCandidate = year1 + nextFourMultiple;

  for (let year = nextLeapCandidate; year < year2; year += 4) {
    if (isLeapYear(year)) {
      count++;
    }
  }
  return count;
}

function startDayOfYear(year) {
  const totalJumps = totalLeapInRange(STANDARD_YEAR, year) + (year - STANDARD_YEAR);
  return (totalJumps + DAY_ON_STANDARD_YEAR) % 7;
}
function fillEmptyAt(grid, start = true, max) {
  for (let index = 0; index < max - grid.length; index++) {
    if (start) {
      grid.unshift("");
    } else {
      grid.push("");
    }
  }
}

function genSingleMonthRow(start, end, offset = 0) {
  const grid = [];
  let newDate = start;
  if (offset !== 0) {
    for (let date = 0; date < offset; date++) {
      grid.push("")
    }
  }
  for (let date = newDate; date < end; date++) {
    grid.push(newDate)
    newDate++;
  }
  return grid
}

function generateMonth(lastDay, month, year) {
  const grid = [];
  let offset = (lastDay + 1) % 7;

  const totalDays = totalDaysIn(month, year);
  const firstRow = genSingleMonthRow(1, 8 - offset, offset)

  grid.push(firstRow);

  for (let index = (8 - offset); index <= totalDays; index += 7) {
    const row = genSingleMonthRow(index, Math.min(index + 7, totalDays + 1))
    grid.push(row)

  }
  while ((offset + totalDays) % 7 !== 0) {
    grid[grid.length - 1].push("")
    offset++;
  }
  return grid
}


function genYearGrid(year) {
  const yearDates = [];
  let startingDay = startDayOfYear(year) - 1
  for (let month = 0; month < 12; month++) {
    const monthCal = generateMonth(startingDay, month + 1, year);
    yearDates.push(monthCal);
    startingDay = startingDay + totalDaysIn(month + 1, year)
  }
  return yearDates
}

function showYear(year) {
  const calofYear = genYearGrid(year);

  for (let month = 0; month < 12; month += 3) {

    const curMonth = prepareMonth(calofYear[month], month + 1);
    const nextMonth = prepareMonth(calofYear[month + 1], month + 2);
    const nextOfNextMonth = prepareMonth(calofYear[month + 2], month + 3);


    const gapArray = generateGapedList(10, 4)

    const firstWithGap = mergeRightCenter(curMonth, gapArray);
    const firstTwo = mergeRightCenter(firstWithGap, nextMonth);
    const firstTwoWithGap = mergeRightCenter(firstTwo, gapArray);

    const firstthree = mergeRightCenter(firstTwoWithGap, nextOfNextMonth);
    console.log(firstthree.join("\n"));
  }
}


const arg = Deno.args

if (arg.length !== 0 && (+arg[0]) + "" !== "NaN") {
  showYear(+arg[0])
}
