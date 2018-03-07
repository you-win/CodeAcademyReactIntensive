const blankTile = " ";
const bombTile = "B";
const seperatorTile = "|";

class Game{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);
    if(this._board.playerBoard[rowIndex][columnIndex] == "B"){
      console.log("Game over!");
      this._board.print();
    }else if(!this._board.hasSafeTiles()){
      console.log("You win!");
    }else{
      console.log("Current Board: ");
      this._board.print();
    }
  }
}

class Board{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = (numberOfRows * numberOfColumns);
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns){
    let board = [];
    for(let i = 0; i < numberOfRows; i++){
      let row = [];
      for(let j = 0; j < numberOfColumns; j++){
        row.push(blankTile);
      }
      board.push(row);
    }
    return board;
  }
  
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
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
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex){
    const neighborOffsets = [];
    for(let i = -1; i < 2; i++){
      for(let j = -1; j < 2; j++){
        neighborOffsets.push([i, j]);
      }
    }
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach((offset) => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
        if(this._bombBoard[neighborRowIndex][neighborColumnIndex] == bombTile){
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  flipTile(rowIndex, columnIndex){
    if(this._playerBoard[rowIndex][columnIndex] != blankTile){
      console.log("This tile has already been flipped!");
      return;
    }else if(this._bombBoard[rowIndex][columnIndex] == bombTile){
      this._playerBoard[rowIndex][columnIndex] = bombTile;
    }else{
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(this._bombBoard, rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  hasSafeTiles(){
    return this._numberOfTiles != this._numberOfBombs
  }

  print(){
    console.log(this._playerBoard.map(row => row.join(seperatorTile)).join("\n"));
  }

  
}

const g = new Game(3, 3,3);
g.playMove(0, 0);
