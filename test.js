
const rows = 6;
const columns = 7;
const board = [];

for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
    }
}




let column = 3;
const availableCells = board.filter((row) => row[column].getValue() === 0).map(row => row[column]);
const lowestRow = availableCells.length - 1;
//console.log(board[lowestRow]);
console.log(lowestRow);




// returns an array of arrays
const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
console.log(boardWithCellValues);



//console.log(board);
