// // 
// const wins = [
//   [1, 2, 3],
//   [1, 4, 7],
//   [1, 5, 9],
//   [2, 5, 8],
//   [3, 6, 9],
//   [4, 5, 6],
//   [7, 5, 3],
//   [7, 8, 9],
// ]

// function checkWin(userInput) {
//   return wins.some((each) => {
//     return each.every((value) => userInput.includes(value))
//   })
// }


const wins = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 6, 9],
  [4, 5, 6],
  [7, 5, 3],
  [7, 8, 9],
]

function checkWin(userInput) {
  return wins.some((each) => {
    return each.every((value) => userInput.includes(value))
  })
}