// Sudoku board (0 represents empty cells)
const sudokuBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    
// Current possible board
// Boolean possibles[num][row][col]
(col = []).length = 9; col.fill(true); (row = []).length = 9; row.fill(col); 
(possibles = []).length = 9; possibles.fill(row);

/* --------------------------------- */
// Above might come from application


// Current possible count
// Row: int RowPCount[row][count]
(count = []).length = 9; count.fill(9)
(rowPCount = []).length = 9; rowPCount.fill(count)

// Col: int ColPCount[col][count]
(colPcount = []).length = 9; colPcount.fill(count)

// Grid: int GridPCount[grid][count]
(gridPCount = []).length = 9; gridPCount.fill(count)
  
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) {
            return false;
        }
        }
    }

    return true;
}

function updateSingularPossibles(po, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (po[num][row][i]) {
            colPcount[num][i] -= 1
            po[num][row][i] = false
        }
        if (po[num][i][col]) {
            rowPCount[num][i] -= 1
            po[num][i][col] = false
        }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            po[num][startRow + i][startCol + j] = false
        }
    }
}

function updateBoardPossibles(po, board) {
    for (let row = 0; row < 9; row++){
        for (let col = 0; col < 9; col++){
            if (board[row][col] != 0){
                updateSingularPossibles(po, row, col, board[row][col])
            }
        }
    }
}

function printBoard(board) {
for (let i = 0; i < 9; i++) {
    console.log(board[i].join(" "));
}
}

// Below: solvers

