const printBoard = (inputBoard) => {
  console.log("Current Board:");
  inputBoard.forEach(function(item){
    console.log(item.join(" | "));
  });
};
let board = [[],[],[]];
board.forEach(function(item){
  item.push(" ", " ", " "); 
});
printBoard(board);
board[0][1] = "1";
board[2][2] = "B";
printBoard(board);
