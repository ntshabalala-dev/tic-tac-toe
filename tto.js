

// with factory patterns


function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    const playedPositions = new Set();
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

    // possibly remove if getting values from html
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

    //private
    const placePosition = (position, player) => {
        // Check if symbol is valid.
        if (!['x', 'o'].includes(player)) {
            console.error('Value exists in the array');
            return -1;
        }

        // Check if the position is valid
        if (position < 0 || position > 8) {
            console.error('Invalid position. Position must be between 0 and 8.');
            return;
        }

        // Check if the position has already been played
        if (playedPositions.has(position)) {
            console.log('Position played already. Position:', position);
            return;
        }


        // Mark the position as played
        playedPositions.add(position);

        // Map positions to their corresponding elements
        const positionMap = [
            ['h1', 'v1', 'c1'],  // 0
            ['h1', 'v2'],          // 1
            ['h1', 'v3', 'c2'],  // 2
            ['h2', 'v1'],          // 3
            ['h2', 'v2', 'c1', 'c2'], // 4
            ['h2', 'v3'],          // 5
            ['h3', 'v1', 'c2'],  // 6
            ['h3', 'v2'],          // 7
            ['h3', 'v3', 'c1']   // 8
        ];

        // Get the corresponding position data from positionMap
        const posData = positionMap[position];
        if (!posData) return console.error('Invalid position');

        // Add the player's symbol to each element in the position
        //console.log(posData, position, player);

        return addToBoard(posData, position, player);
    }

    const addToBoard = (params, position, player) => {
        let winner = {};
        params.forEach(element => {
            const count = boardPlacements[element].push({
                // add players move as a object to the boardPlacements key:val store. Example: {x:4}
                [player]: position
            });

            // check winner eligibility each time a winning combination gets 3 placements
            if (count == 3) {
                if (result = threePlacements(element, player)) {
                    winner = result;
                    return;
                }
            }
        });
        // Continue playing
        return winner;
    }

    const threePlacements = (placement, player) => {
        // Returns an array of player positions that were added to the boardplacements object ['0','4','8']
        const mappedPositions = boardPlacements[placement].map((obj) => Object.values(obj)[0]).sort((a, b) => a - b);

        // Returns an array of player symbols that were added to the boardplacements object ['x','x','x']
        const mappedPlayers = boardPlacements[placement].map((obj) => Object.keys(obj)[0] + '');

        // Check if each symbol placed is the same as the current players symbol. Example all items in ['x','x','x'] = player
        const firstCondition = mappedPlayers.every((currentValue) => currentValue == player)
        let secondCondition = false

        console.log('players', mappedPlayers);

        // limit to params
        winningCombinations().forEach((combination) => {
            combination.every((element, index) => {
                if (element === mappedPositions[index] && !secondCondition) {
                    secondCondition = true;
                    return false;
                }
            })
        });

        if (firstCondition && secondCondition) {
            return { player: player, winningCombination: placement };
        } else {
            return null;
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


function GameController(P1Name = "Player One", P2Name = "Player Two") {
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
        return activePlayer
    }

    let printNewRound = () => {
        return `${getActivePlayer().name}'s turn.`;
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

    return {
        playRound,
        printNewRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

function ScreenController() {
    const boardGame = GameController();
    const playerTurn = document.querySelector('.turn--active');
    const board = document.querySelector('.board');
    const boardCells = document.querySelectorAll('.board__item');

    console.log(board);


    let isCleared = false;

    const clearScreen = () => {
        if (!isCleared) {
            boardCells.forEach((boardCell, index) => {
                boardCell.textContent = '';
                boardCell.dataset.cell = index
            });
        }
        isCleared = true;
    }

    // const updateScreen = () => {
    //     const board = game.getBoard();
    //     const activePlayer = game.getActivePlayer();

    // }

    const playRound = (e) => {
        const target = e.target;
        // do nothing if clicked area doesn't have a data cell attribute
        if (!target.dataset.cell) return;

        const spanEl = document.createElement('span');
        spanEl.className = 'letter';
        spanEl.textContent = boardGame.getActivePlayer().symbol;
        target.append(spanEl);
    };

    board.addEventListener('click', playRound);
    clearScreen();
}

ScreenController();

// const board = Gameboard();
// board.setSymbol('X', 0);
// board.setSymbol('X', 4);
// board.setSymbol('X', 8);
// console.log(board.printBoard());
// console.log(board.getBoard());
