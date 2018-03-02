const blankTile = " ";
const bombTile = "B";
const seperatorTile = "|";
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for(let i = 0; i < numberOfRows; i++){
    let row = [];
    for(let j = 0; j < numberOfColumns; j++){
      row.push(blankTile);
    }
    board.push(row);
  }
  return board;
};
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for(let i = 0; i < numberOfRows; i++){
    let row = [];
    for(let j = 0; j < numberOfColumns; j++){
      row.push(blankTile);
    }
    board.push(row);
  }
  let numberOfBombsPlaced = 0;
  while(numberOfBombsPlaced < numberOfBombs){
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    if(board[randomRowIndex][randomColumnIndex] != bombTile){
      board[randomRowIndex][randomColumnIndex] = bombTile;
      numberOfBombsPlaced++;
    }
  }
  return board;
};
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [];
  for(let i = -1; i < 2; i++){
    for(let j = -1; j < 2; j++){
      neighborOffsets.push([i, j]);
    }
  }
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  console.log(neighborOffsets);
  neighborOffsets.forEach((offset) => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    if(neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns){
      if(bombBoard[neighborRowIndex][neighborColumnIndex] == bombTile){
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if(playerBoard[rowIndex][columnIndex] != blankTile){
    console.log("This tile has already been flipped!");
    return;
  }else if(bombBoard[rowIndex][columnIndex] == bombTile){
    playerBoard[rowIndex][columnIndex] = bombTile;
  }else{
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};
const printBoard = (board) => {
  console.log(board.map(row => row.join(seperatorTile)).join("\n"));
}
let playerBoard = generatePlayerBoard(3, 3);
let bombBoard = generateBombBoard(3, 3, 2);
console.log("Player Board: ");
printBoard(playerBoard);
console.log("Bomb Board: ");
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
console.log("Updated Player Board: ");
printBoard(playerBoard);
