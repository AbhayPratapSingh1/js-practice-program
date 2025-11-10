const unique_value = (unique, each) => {
  if (!unique.includes(each)) {
    unique.push(each);
  }
  return unique;
};

const frequencyAnalysis = (frequencyChart, current) => {
  for (let index = 0; index < frequencyChart.length; index++) {
    const currentChart = frequencyChart[index];
    if (currentChart[0] === current) {
      currentChart[1] += 1;
      return frequencyChart;
    }
  }
  frequencyChart.push([current, 1]);
  return frequencyChart;
}

const sumOfAll = (count, each) => {
  return count + each;
};

// ### **1. Festival Ribbon Count**
// A craft booth cuts ribbons of different colors throughout the day:
// They want to know how many **blue** ribbons were cut.
const q1 = ["red", "blue", "red", "green", "red", "blue"];
const a1 = q1.reduce((color) => color === "blue", 0);
console.log("1.", a1);

// ### **2. Stargazing Log**
// A stargazing club logs visible constellations from each night:
// Combine everyone’s observations into one list of all constellations spotted.
const q2 = [["Orion", "Leo"], ["Taurus"], ["Orion", "Gemini"]];
const a2 = q2.flat().reduce(unique_value, []);
console.log("2.", a2);

// ### **3. Birdwatching Duplicate Removal**
// A birdwatcher notes species seen during a morning walk:
// Create a list of the species without repeats, preserving the order first seen.
const q3 = ["sparrow", "crow", "sparrow", "eagle", "crow"];
const a3 = q3.reduce(unique_value, []);
console.log("3.", a3);

// ### **4. Classroom Attendance Check**
// A class records names of students present for each period:
// Determine which distinct students attended at least once.
const q4 = [["Asha", "Ravi", "Neel"], ["Ravi"], ["Asha", "Meera"]];
const a4 = q4.flat().reduce(unique_value, []);
console.log("4.", a4);

// ### **5. Candy Jar Stocking**
// A store logs candy refills like this:
// Find the total number of candies added.
const q5 = [[5, 3], [2], [4, 1]];
const a5 = q5.flat().reduce(sumOfAll, 0);
console.log("5.", a5);

// ### **6. Music Rehearsal Notes**
// Choir groups practice with sequences:
// Check whether **any** group sang "do".
const q6 = [["mi", "fa", "so"], ["do", "mi"], ["fa"]];
const a6 = q6.flat().some((each) => each === "do");
console.log("6.", a6);

// ### **7. Weather Sensor Validation**
// Several temperature sheets:
// Check if **every** recorded temperature is below 32.
const q7 = [[22, 23], [25, 24, 22], [29]];
const a7 = q7.flat().every((each) => each < 32);
console.log("7.", a7);

// ### **8. Fitness Tracker Miles**
// Runner logs:
// Find the total miles run.
const q8 = [[2, 3, 2], [4], [1, 1]];
const a8 = q8.flat().reduce(sumOfAll, 0);
console.log("8.", a8);

// ### **9. Art Workshop Color Variety**
// Paint colors used in sessions:
// Find unique colors used.
const q9 = [["blue", "yellow"], ["yellow", "green"], ["blue"]];
const a9 = q9.flat().reduce(unique_value, []);
console.log("9.", a9);

// ### **10. Library Return Counter**
// Books returned:
// Count how many times “Dune” was returned.
const q10 = ["Dune", "Dune", "Foundation", "Dune"];
const a10 = q10
  .filter((each) => each === "Dune")
  .reduce((count) => count + 1, 0);
console.log("10.", a10);

// ### 11. Lunchbox Ingredient Inventory
// Lists of ingredients. Produce a list of distinct ingredients.
const q11 = [["rice", "lentils"], ["rice"], ["curd", "lentils"]];
const a11 = q11.flat().reduce(unique_value, []);
console.log("11.", a11);

// ### 12. Choir Harmony Review
// Singers produce sequences. Check whether any group sang `"so"`.
const q12 = [["la", "la"], ["mi"], ["so", "la"]];
const a12 = q12.flat().some((each) => each === "so");
console.log("12.", a12);

// ### 13. Vegetable Crate Totals
// Crate weights. Find the sum of all weights.
const q13 = [[4, 6], [2, 3, 1], [5]];
const a13 = q13.flat().reduce(sumOfAll, 0);
console.log("13.", a13);

// ### 14. Post Office Parcel Record
// Parcel sizes logged. Find unique parcel sizes.
const q14 = ["small", "large", "medium", "small"];
const a14 = q14.reduce(unique_value, []);
console.log("14.", a14);

// ### 15. Wildlife Sighting Count
// Animal sightings. Count how many times “deer” was seen.
const q15 = ["deer", "deer", "rabbit", "deer"];
const a15 = q15.reduce(
  (count, each) => (each === "deer" ? count + 1 : count),
  0
);
console.log("15.", a15);

// ### 16. Study Group Completion
// Study groups finish chapters. Find all chapters completed by any group.
const q16 = [[1, 2], [3], [2, 4, 1]];
const a16 = q16.flat().reduce(unique_value, []);
console.log("16.", a16);

// ### 17. Dance Class Steps
// Step sequences. Check if `"turn"` appears in any sequence.
const q17 = [
  ["step", "tap"],
  ["turn", "step"],
];
const a17 = q17.flat().some((each) => each === "turn");
console.log("17.", a17);

// ### 18. Garden Watering Amount
// Water used. Total amount of water used.
const q18 = [[1, 2, 1], [3], [2]];
const a18 = q18.flat().reduce(sumOfAll, 0);
console.log("18.", a18);

// ### 19. Paper Crane Making
// Origami students make cranes in sessions. Compute the total cranes.
const q19 = [[3, 2], [1], [4]];
const a19 = q19.flat().reduce(sumOfAll, 0);
console.log("19.", a19);

// ### 20. Fruit Basket Inventory
// Mixed fruits recorded. List unique fruits used.
const q20 = [["apple", "banana"], ["apple"], ["apple", "orange"]];
const a20 = q20.flat().reduce(unique_value, []);
console.log("20.", a20);

// ### 21. Classroom Pen Distribution
// Pens given. Total pens handed out.
const q21 = [[2, 3], [1], [3, 2]];
const a21 = q21.flat().reduce(sumOfAll, 0);
console.log("21.", a21);

// ### 22. Movie Marathon Titles
// Movies watched. List unique titles watched.
const q22 = [["Inception", "Dunkirk"], ["Interstellar"], ["Inception"]];
const a22 = q22.flat().reduce(unique_value, []);
console.log("22.", a22);

// ### 23. Name Badge Sorting
// Students sign in repeatedly. Create a unique list of attendees.
const q23 = ["A", "B", "A", "C", "B"];
const a23 = q23.reduce(unique_value, []);
console.log("23.", a23);

// ### 24. Ice Cream Orders
// Orders recorded. Find how many orders were `"chocolate"`.
const q24 = ["vanilla", "chocolate", "strawberry", "chocolate"];
const a24 = q24.reduce(
  (count, each) => (each === "chocolate" ? count + 1 : count),
  0
);
console.log("24.", a24);

// ### 25. Flowers in Bouquets
// Bouquets contain. List all unique flowers used.
const q25 = [
  ["rose", "lily"],
  ["lily", "tulip"],
];
const a25 = q25;
console.log("25.", a25);

// ### 26. Morning Exercise Count
// Repetitions. Total repetitions done.
const q26 = [[10, 20], [5], [15, 10]];
const a26 = q26.flat().reduce(sumOfAll, 0);
console.log("26.", a26);

// ### 27. Train Station Announcements
// Stations announced. Find the station names without repeats.
const q27 = [["A", "B"], ["B", "C"], ["A"]];
const a27 = q27.flat().reduce(unique_value, []);
console.log("27.", a27);

// ### 28. Book Club Pages Read
// Groups read pages. Find total pages read.
const q28 = [[12, 10], [5], [8, 7]];
const a28 = q28.flat().reduce(sumOfAll, 0);
console.log("28.", a28);

// ### 29. Rainfall Data Check
// Measurements. Check if all values are positive.
const q29 = [[3, 4], [5, 2], [1]];
const a29 = q29.flat().reduce(sumOfAll, 0);
console.log("29.", a29);

// ### 30. Fruit Stand Weight Totals
// Weights. Compute total weight.
const q30 = [[4, 3], [2], [3, 1]];
const a30 = q30.flat().reduce(sumOfAll, 0);
console.log("30.", a30);

// ### 31. School Snack List
// Snacks. Unique snacks served.
const q31 = [["idli", "vada"], ["vada", "upma"]];
const a31 = q31.flat().reduce(unique_value, []);
console.log("31.", a31);

// ### 32. Photo Contest Entries
// Photographers submit sets. List unique themes.
const q32 = [["sunset", "bird"], ["river"], ["sunset"]];
const a32 = q32.flat().reduce(unique_value, []);
console.log("32.", a32);

// ### 33. Electricity Reading Validation
// Readings. Check if all readings are below 120.
const q33 = [[110, 115], [118], [109]];
const a33 = q33.flat().every(each => each < 120);
console.log("33.", a33);

// ### 34. Jogging Lap Count
// Laps. Compute total laps.
const q34 = [[2, 3, 2], [1], [4]];
const a34 = q34.flat().reduce(sumOfAll, 0);
console.log("34.", a34);

// ### 35. Music Playlist Repeats
// Songs played. Count occurrences of `"track1"`.
const q35 = ["track1", "track2", "track1"];
const a35 = q35.reduce((count, each) => each === "track1" ? count + 1 : count, 0);
console.log("35.", a35);

// ### 36. Café Order Ingredients
// Ingredients. Unique ingredients needed.
const q36 = [["cheese", "bread"], ["tomato"], ["bread"]];
const a36 = q36.flat().reduce(unique_value, []);
console.log("36.", a36);

// ### 37. Student Poetry Words
// Word lists. List all unique words.
const q37 = [["sky", "blue"], ["night"], ["sky", "dark"]];
const a37 = q37.flat().reduce(unique_value, []);
console.log("37.", a37);

// ### 38. Gift Box Items
// Items. List unique items used.
const q38 = [["toy", "sticker"], ["candy", "sticker"]];
const a38 = q38.flat().reduce(unique_value, []);
console.log("38.", a38);

// ### 39. Gym Routine Count
// Routine counts. Total counts.
const q39 = [[6, 4], [3, 2]];
const a39 = q39.flat().reduce(sumOfAll, 0);
console.log("39.", a39);

// ### 40. Fish Tank Measurements
// Measurements. Check if any measurement is above 7.
const q40 = [[5, 6], [7], [6]];
const a40 = q40.flat().some(each => each > 7)
console.log("40.", a40);

// ### 41. Candy Distribution
// Candy numbers. Sum all candies.
const q41 = [[1, 2, 3], [2]];
const a41 = q41.flat().reduce(sumOfAll, 0);
console.log("41.", a41);

// ### 42. Workshop Attendance
// Participants. List unique participants.
const q42 = [["Tom", "Jerry"], ["Jerry", "Spike"]];
const a42 = q42.flat().reduce(unique_value, []);
console.log("42.", a42);

// ### 43. Space Camp Star Names
// Stars named. Unique star names.
const q43 = [["Vega", "Sirius"], ["Vega", "Rigel"]];
const a43 = q43.flat().reduce(unique_value, []);
console.log("43.", a43);

// ### 44. Train Car Passenger Check
// Counts. Total passengers.
const q44 = [[10, 12], [15]];
const a44 = q44.flat().reduce(sumOfAll, 0);
console.log("44.", a44);

// ### 45. Weekly Grocery Tally
// Quantities. Find the total.
const q45 = [[3, 5], [2, 1]];
const a45 = q45.flat().reduce(sumOfAll, 0);
console.log("45.", a45);

// ### 46. Tea Tasting Flavors
// Flavors. Unique flavors.
const q46 = [["mint", "ginger"], ["lemon"], ["mint"]];
const a46 = q46.flat().reduce(unique_value, []);
console.log("46.", a46);

// ### 47. Photography Exposure Values
// Values. Check if any value equals 4.
const q47 = [[2, 3], [1], [4, 2]];
const a47 = q47.flat().some(each => each === 4);
console.log("47.", a47);

// ### 48. Drawing Class Tools
// Tools. Unique tools used.
const q48 = [["pencil", "charcoal"], ["ink"], ["pencil"]];
const a48 = q48.flat().reduce(unique_value, []);
console.log("48.", a48);

// ### 49. Coin Collection Tally
// Coins collected. Total coins.
const q49 = [[1, 1, 2], [2, 1]];
const a49 = q49.flat().reduce(sumOfAll, 0);
console.log("49.", a49);

// ### 50. Cooking Class Spices
// Spices. Unique spices.
const q50 = [["salt", "pepper"], ["turmeric"], ["salt"]];
const a50 = q50.flat().reduce(unique_value, []);
console.log("50.", a50);

// ### 51. Fruit Log Count
// Count how many times “banana” appears in a fruit log.
const q51 = [['apple', "mango"], ["banana", "banana"], ["banana"]];
const a51 = q51.flat().reduce((count, each) => each === "banana" ? count + 1 : count, 0);
console.log("51.", a51);

// ### 52. Worksheet Words Combination
// Combine all words written by students on three worksheets.
const q52 = [["hello", "I"], ["am", "a"], ["student", "in", "this", "schol"]]
const a52 = q52.flat().reduce((prev, each) => prev + " " + each);
console.log("52.", a52);

// ### 53. Word "Excellent" Check
// Determine whether any student wrote the word “excellent”.
const q53 = ["hello", "world", "i", "am", "not", "a", "excellent", "student"]
const a53 = q53.some(each => each === "excellent");
console.log("53.", a53);

// ### 54. Rainfall Cap Validation
// Check whether all recorded rainfall values are under 50.
const q54 = [[12, 23], [12, 34, 4], [1, 4, 52]]
const a54 = q54.flat().every(each => each < 50);
console.log("54.", a54);

// ### 55. Unique Movie Genres
// Produce a list of unique movie genres mentioned by a club.
const q55 = [["movie1", "movie2", "movie3"], ["movie2", "movie3", "movie5"], ["movie6"]]
const a55 = q55.flat().reduce(unique_value, []);
console.log("55.", a55);

// ### 56. Pushup Total
// Compute the total number of pushups done in all sessions.
const q56 = [[12, 5, 4], [1, 42, 5]]
const a56 = q56.flat().reduce(sumOfAll, 0);
console.log("56.", a56);

// ### 57. Unique Bird Species
// Create a list of all unique bird species spotted on a trip.
const q57 = [["bird1", "bird4", "bird3"], ["bird2", "bird3", "bird5"]]
const a57 = q57.flat().reduce(unique_value, []);
console.log("57.", a57);

// ### 58. Red Tile Count
// Count how many tiles in a mosaic were listed as “red”.
const q58 = [["blue", "green", "red"], ["orange", "red", "red"], ["red", "orange"]]
const a58 = q58.flat().reduce((count, each) => each === "red" ? count + 1 : count, 0);
console.log("58.", a58);

// ### 59. Cycling Distance Sum
// Sum all distances covered during cycling practice.
const q59 = [[12, 5, 4], [1, 42, 5]]
const a59 = q59.flat().reduce(sumOfAll, 0);
console.log("59.", a59);

// ### 60. Unique Ice Cream Flavors
// List unique flavors tried in an ice-cream tasting event.
const q60 = [["flavor1", "flavor2", "flavor3"], ["flavor2", "flavor3", "flavor4"]];
const a60 = q60.flat().reduce(unique_value, []);
console.log("60.", a60);

// ### 61. High Score Check
// Check if any participant scored above 90 in tests.
const q61 = [[84, 86, 20, 43], [90, 31, 59]]
const a61 = q61.flat().some(each => each > 90);
console.log("61.", a61);

// ### 62. Age Restriction Validation
// Verify if all ages listed for an event are 18 or above.
const q62 = [[11, 18, 24], [22, 18, 25]]
const a62 = q62.flat().every(each => each >= 18);
console.log("62.", a62);

// ### 63. Combined Recipe Ingredients
// Combine the ingredients from all recipe attempts.
const q63 = [["salt", "pepper"], ["turmeric"], ["salt"]];
const a63 = q63.flat().reduce(unique_value, []);
console.log("63.", a63);

// ### 64. Reverse Dance Steps
// Reverse the order of dance steps recorded by a choreographer.
const q64 = ["step1", "step2", "step3", "step4", "step5"]
const a64 = q64.reduce((prev, current) => { prev.unshift(current); return prev }, [])
console.log("64.", a64);

// ### 65. Word Frequency Summary
// Build a frequency summary of words used in a poem draft.
const q65 = ["twinkle", "twinkle", "little", "star", "How", "I", "wonder", "what", "you", "are", "Up", "above", "the", "world", "so", "high", "Like", "a", "diamond", "in", "the", "sky"];
const a65 = q65.reduce(frequencyAnalysis, []);
console.log("65.")
console.table(a65)

// ### 66. Note "Fa" Check
// Determine whether the note “fa” appears in any music sheet.
const q66 = [["sa", "ba", "fa", "la"], ["da", "ha", "na"]]
const a66 = q66.flat().some(each => each === "fa");
console.log("66.", a66);

// ### 67. Parcel Weight Sum
// Sum all weights of parcels recorded in a courier office.
const q67 = [[12, 32, 12, 13], [23, 4, 23], [23, 54]]
const a67 = q67.flat().reduce(sumOfAll, 0);
console.log("67.", a67);

// ### 68. Distinct Pizza Toppings
// List distinct toppings chosen by pizza customers.
const q68 = [["topping1", "topping2", "topping3"], ["topping2", "topping3", "topping4"]]
const a68 = q68.flat().reduce(unique_value, []);
console.log("68.", a68);

// ### 69. Chapter Reread Count
// Count how many times a student reread a particular chapter.
const q69 = [[0, 2, 3, 1], [1, 2, 3, 4], [1, 3, 2]]; // assume chapter 2
const a69 = q69.flat().reduce((count, each) => each === 2 ? count + 1 : count);
console.log("69.", a69);

// ### 70. Combine Color Swatches
// Combine all color swatches from three design sets.
const q70 = [["color1", "color2", "color3"], ["color2", "color3", "color4"], ["color1", "color5"]]
const a70 = q70.flat().reduce(unique_value, []);
console.log("70.", a70);

// ### 71. Maximum Threshold Check
// Check if any experiment reading hit the maximum threshold of 100.
const q71 = [[12, 32, 54, 86], [13, 54, 8, 68], [90, 122, 32]]
const a71 = q71.flat().some(each => each >= 100);
console.log("71.", a71);

// ### 72. Completion Verification
// Verify whether every participant completed at least one task.
const q72 = [["pass", "fail", "fail", "pass"], ["fail", "fail", "pass"], ["pass", "pass", "pass"]]
const a72 = q72.every(each => each.some(every => every === "pass"));
console.log("72.", a72);

// ### 73. Unique Travel Destinations
// List unique destinations chosen in a travel club survey.
const q73 = [["place1", "place2", "place2"], ["place2", "place3", "place4"]]
const a73 = q73.flat().reduce(unique_value, []);
console.log("73.", a73);

// ### 74. Instrument Practice Sum
// Sum all hours spent practicing an instrument.
const q74 = [[12, 32, 54, 86], [13, 54, 8, 68], [90, 122, 32]]
const a74 = q74.flat().reduce(sumOfAll, 0);
console.log("74.", a74);

// ### 75. Distinct Plant Types
// Find all distinct types of plants noted during fieldwork.
const q75 = [["plant1", "plant2", "plant3"], ["plant2", "plant3", "plant4"], ["plant1", "plant5"]]
const a75 = q75.flat().reduce(unique_value, []);
console.log("75.", a75);

// ### 76. Specific Sound Occurrence Count
// Count occurrences of a specific sound in a phonetics study.
const q76 = ["sound1", "sound2", "sound2", "sound3", "sound3", "sound4", "sound5"]
const a76 = q76.reduce(frequencyAnalysis, []);
console.log("76.");
console.table(a76);

// ### 77. Combined Syllables
// Combine all syllables used in language drills.
const q77 = [["lang_1", "lang_2", "lang_3"], ["lang_2", "lang_3", "lang_4"], ["lang_1", "lang_5"]]
const a77 = q77.flat().reduce(unique_value, []);
console.log("77.", a77);

// ### 78. Zero Measurement Check
// Check if any measurement is exactly zero.
const q78 = [[12, 32, 54, 86], [13, 54, 8, 68], [90, 122, 32, 0]]
const a78 = q78.flat().some(each => each === 0);
console.log("78.", a78);

// ### 79. Weight Limit Validation
// Verify that all listed items weigh less than 10 grams.
const q79 = [[1, 2, 4, 6], [3, 4, 8, 6], [9, 2, 2, 0]]
const a79 = q79.flat().every(each => each < 10);
console.log("79.", a79);

// ### 80. Color Frequency Summary
// Summarize how many times each color appears in a creative art project.
const q80 = [["color1", "color2", "color3"], ["color2", "color3", "color4"], ["color1", "color5"]]
const a80 = q80.flat().reduce(frequencyAnalysis, []);
console.log("80.");
console.table(a80);

// ### 81. Reverse Instructions
// Reverse the order of instructions written for a scavenger hunt.
const q81 = ["step1", "step2", "step3", "step4", "step5", "step6", "step7"];
const a81 = q81.flat().reduce((prev, each) => { prev.unshift(each); return prev }, []);
console.log("81.", a81);

// ### 82. Journal Mention Count
// Count how many entries in a journal mention “rain”.
const q82 = [["train", "cran", "brain", "main", "rain"], ["jain", "rain"], ["rain", "raining"]]
const a82 = q82.flat().reduce((count, each) => each === "rain" ? count + 1 : count);
console.log("82.", a82);

// ### 83. Merge Poetry Fragments
// Merge all small poetry fragments into one list of lines.
const q83 = [["twinkle", "twinkle", "little", "star"], ["who", "stole", "my", "pickle", "jar"]];
const a83 = q83.flat();
console.log("83.", a83);

// ### 84. Unique Cartoon Characters
// List unique cartoon characters favored by children.
const q84 = [["doremon", "pikachu", "charizard", "charizard"], ["pikachu", "balbasaur"]];
const a84 = q84.flat().reduce(unique_value, []);
console.log("84.", a84);

// ### 85. Total Points Scored
// Add up all points scored by a team across multiple games.
const q85 = [[12, 32, 32], [12, 43, 54], [34, 31]]
const a85 = q85.flat().reduce(sumOfAll, 0);
console.log("85.", a85);

// ### 86. Exact Score Check
// Check whether any team scored exactly 50 points.
const q86 = [20, 30, 42, 40, 50, 23, 23]
const a86 = q86.some(each => each === 50);
console.log("86.", a86);

// ### 87. pH Value Validation
// Ensure all pH values recorded are below 8.
const q87 = [1, 2, 3, 4, 2, 1, 3, 4, 2, 5, 6, 5, 7, 4, 1]
const a87 = q87.every(each => each < 8);
console.log("87.", a87);

// ### 88. Unique Chocolate Flavors
// Count unique flavors tasted in a chocolate workshop.
const q88 = ["flavor1", "flavor2", "flavor3", "flavor2", "flavor3", "flavor4", "flavor4", "flavor5"]
const a88 = q88.reduce(unique_value, []);
console.log("88.", a88);

// ### 89. Meditation Time Sum
// Sum all minutes of meditation logged across sessions.
const q89 = [[12, 32, 54, 86], [13, 54, 8, 68], [90, 122, 32, 0]]
const a89 = q89.flat().reduce(sumOfAll, 0);
console.log("89.", a89);

// ### 90. Unique Repair Tools
// Identify every unique tool used in a repair workshop.
const q90 = ["tool_1", "tool_2", "tool_3", "tool_2", "tool_3", "tool_4", "tool_4", "tool_5"]
const a90 = q90.reduce(unique_value, []);
console.log("90.", a90);

// ### 91. White Shirt Count
// Count how many shirts in a laundry batch were listed as “white”.
const q91 = [["blue", "green", "white"], ["white", "red", "green"], ["orange", "white", "white"]]
const a91 = q91.flat().reduce((count, each) => each === "white" ? count + 1 : count);
console.log("91.", a91);

// ### 92. Combined Meeting Notes
// Combine all notes written during a meeting into one list.
const q92 = [["note_1", "note_2", "note_3"], ["note_4", "note_5", "note_6"], ["note_7", "note_8", "note_9"]]
const a92 = q92.flat();
console.log("92.", a92);

// ### 93. "Fragile" Item Check
// Check if any item in a shipment is marked “fragile”.
const q93 = [["fragile", "unknown", "unknown2"], ["fragile", "unknown", "unknown2"], ["fragile", "unknown", "unknown2"]]
const a93 = q93.flat().some(each => each === "fragile");
console.log("93.", a93);

// ### 94. Lowercase Letter Validation
// Verify that all letters written by participants are lowercase.
const q94 = ["hello", "iam", "in", "the", "work"];
const a94 = q94.flat().every(each => each === each.toLowerCase());
console.log("94.", a94);

// ### 95. Reverse Chess Moves
// Reverse a list of moves recorded during a chess game.
const q95 = ["E4", "E5", "C3", "C6", "D4", "D8"]
const a95 = q95.flat().reduce((prev, each) => { prev.unshift(each); return prev }, []);
console.log("95.", a95);

// ### 96. Musical Note Frequency
// Build a frequency list for musical notes practiced in a session.
const q96 = ["C", "D", "C", "B", "F", "F", "C#", "D"]
const a96 = q96.flat().reduce(frequencyAnalysis, []);
console.log("96.");
console.table(a96);

// ### 97. Error Message Count
// Count the number of times “error” appears in a log of messages.
const q97 = ["hello", "count", "error", "pass", "testing", "error", "error"]
const a97 = q97.flat().reduce((count, each) => each === "error" ? count + 1 : count, 0);
console.log("97.", a97);

// ### 98. Gather All Ingredients
// Gather all ingredients used in three versions of the same dish.
const q98 = [["cheese", "bread"], ["tomato"], ["bread"]];
const a98 = q98.flat().reduce(unique_value, []);
console.log("98.", a98);

// ### 99. Skipped Activity Check
// Check if any student skipped all activity sessions.
const student = ["student_1", "student_2", "student_3"];
const q99 = [["student_1", "student_2"], ["student_2", "student_1"], ["student_1", "student_2"]];
const a99 = student.some(each => !q99.some(students => students.includes(each)));
console.log("99.", a99);

// ### 100. Distinct Hummed Songs
// Create a list of distinct songs hummed by children on a bus ride.
const q100 = [["song_1", "song_2", "song_3"], ["song_2", "song_3", "song_5", "song4"]]
const a100 = q100.flat().reduce(unique_value, []);
console.log("100.", a100);
