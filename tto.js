

// with factory patterns


function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    const boardPlacements = {
        h1: [],
        h2: [],
        h3: [],

        v1: [],
        v2: [],
        v3: [],

        c1: [],
        c2: [],
    };

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => {
        return board;
    };

    const setSymbol = (playerSymbol, position) => {
        // For each cell in a row, it calls the getValue() method,
        const availableCells = board.map((row) => row.filter((cell) => cell.getValue() === ''))

        if (!availableCells.length) return;
        const row = getCoordinates(position)[0];
        const column = getCoordinates(position)[1];
        board[row][column].addSymbol(playerSymbol);
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        return boardWithCellValues;
    };

    const getCoordinates = (position) => {
        [row, col] = [-1, -1];
        switch (position) {
            case 0:
                [row, col] = [0, 0];
                break;
            case 1:
                [row, col] = [0, 1];
                break;
            case 2:
                [row, col] = [0, 2];
                break;
            case 3:
                [row, col] = [1, 0];
                break;
            case 4:
                [row, col] = [1, 1];
                break;
            case 5:
                [row, col] = [1, 2];
                break;
            case 6:
                [row, col] = [2, 0];
                break;
            case 7:
                [row, col] = [2, 1];
                break;
            case 8:
                [row, col] = [2, 2];
                break;
            default:
                console.log('position not found');
                return [];
        }
        return [row, col];
    }


    const placePosition = (position, player) => {
        // Needs to be stored in local storage
        if (playedPositions.includes(position)) {
            console.log('Position played already. Position:', position);
            return;
        }

        // &&& check for x & os string

        playedPositions.push(position);

        switch (position) {
            case 0:
                addToBoard(['h1', 'v1', 'c1'], position, player);
                break;
            case 1:
                addToBoard(['h1', 'v2'], position, player);
                break;
            case 2:
                addToBoard(['h1', 'v3', 'c2'], position, player);
                break;
            case 3:
                addToBoard(['h2', 'v1'], position, player);
                break;
            case 4:
                addToBoard(['h2', 'v2', 'c1', 'ca2'], position, player);
                break;
            case 5:
                addToBoard(['h2', 'v3'], position, player);
                break;
            case 6:
                addToBoard(['h3', 'v1', 'c2'], position, player);
                break;
            case 7:
                addToBoard(['h3', 'v2'], position, player);
                break;
            case 8:
                addToBoard(['h3', 'v3', 'c1'], position, player);
                break;
            default:
                console.log('position not found');
                break;
        }
    }

    return { getBoard, setSymbol, printBoard }
}


function Cell() {
    let value = '';

    const addSymbol = (playerSymbol) => {
        value = playerSymbol;
    };

    const getValue = () => value;

    return {
        addSymbol,
        getValue
    };
}


function GameController(P1Name, P2Name) {
    let players = [
        {
            name: P1Name,
            symbol: 'X'
        },
        {
            name: P2Name,
            symbol: 'O'
        },
    ]

    const board = Gameboard();

    let activePlayer = players[0];

    let switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    let getActivePlayer = () => {
        activePlayer
    }

    let printNewRound = () => {
        // Create initial board with the default player going first (P1)
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (position) => {
        console.log(
            `Dropping ${getActivePlayer().name}'s token into column ${column}...`
        );
        board.setSymbol(getActivePlayer().symbol, position);

        /*  This is where we would check for a winner and handle that logic,
            such as a win message. */

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();
}

const board = Gameboard();
board.setSymbol('X', 0);
console.log(board.printBoard());
// console.log(board.getBoard());
