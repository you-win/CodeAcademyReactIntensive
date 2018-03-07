export class Board{
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
        row.push(" ");
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
        row.push(" ");
      }
      board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while(numberOfBombsPlaced < numberOfBombs){
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if(board[randomRowIndex][randomColumnIndex] != "B"){
        board[randomRowIndex][randomColumnIndex] = "B";
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
        if(this._bombBoard[neighborRowIndex][neighborColumnIndex] == "B"){
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  flipTile(rowIndex, columnIndex){
    if(this._playerBoard[rowIndex][columnIndex] != " "){
      console.log("This tile has already been flipped!");
      return;
    }else if(this._bombBoard[rowIndex][columnIndex] == "B"){
      this._playerBoard[rowIndex][columnIndex] = "B";
    }else{
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(this._bombBoard, rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  hasSafeTiles(){
    return this._numberOfTiles != this._numberOfBombs
  }

  print(){
    console.log(this._playerBoard.map(row => row.join("|")).join("\n"));
  }

  
}
