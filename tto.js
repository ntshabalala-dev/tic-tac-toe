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

        if (!availableCells.length) return -1;

        const coordinates = getCoordinates(position);
        const row = coordinates[0];
        const column = coordinates[1];

        board[row][column].addSymbol(playerSymbol);
        return placePosition(position, playerSymbol);
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
                console.error('position not found');
                return [];
        }
        return [row, col];
    }

    const getWinningCombinations = () => {
        return [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    }

    const placePosition = (position, player) => {
        // Check if symbol is valid.
        if (!['X', 'O'].includes(player)) {
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
            console.error('Position played already. Position:', position);
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
        let secondCondition = false
        let winningCombination = [];
        // Returns a sorted array of player positions that were added to the boardplacements object ['0','4','8']
        const mappedPositions = boardPlacements[placement].map((obj) => Object.values(obj)[0]).sort((a, b) => a - b);

        // Returns an array of player symbols that were added to the boardplacements object ['x','x','x']
        const mappedPlayers = boardPlacements[placement].map((obj) => Object.keys(obj)[0] + '');

        // Check if each symbol placed is the same as the current players symbol. Example all items in ['x','x','x'] = player
        const firstCondition = mappedPlayers.every((currentValue) => currentValue == player)

        // get winning combination
        getWinningCombinations().some((combination) => {
            const isEqual = combination.every((element, index) => {
                return element === mappedPositions[index];
            });

            if (isEqual) {
                secondCondition = true
                winningCombination = combination;
                return true;
            }
        });

        if (firstCondition && secondCondition) {
            return { player: player, winningCombination: winningCombination };
        } else {
            return null;
        }
    }

    const getPlayedPositions = () => {
        return playedPositions;
    }

    return { getBoard, setSymbol, printBoard, getPlayedPositions }
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
            symbol: 'X',
            turn: 1,
        },
        {
            name: P2Name,
            symbol: 'O',
            turn: 2,
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
        const roundResult = board.setSymbol(getActivePlayer().symbol, +position);
        if (Object.hasOwn(roundResult, "winningCombination")) {
            return roundResult;
        } else if (board.getPlayedPositions().size === 9) {
            const range = [...Array(9).keys()];
            // Output: [0, 1, 2, 3, 4, 5, 6, 7, 8]
            return { player: 'Draw', winningCombination: range };
        }
        switchPlayerTurn();
        return null;
    };


    return {
        playRound,
        getActivePlayer,
        printNewRound,
        getBoard: board.getBoard
    };
}

function ScreenController() {
    let boardGame = null;
    let isButtonVisible = false;
    const dialogButtons = document.querySelector('.dialog-header__buttons');
    const board = document.querySelector('.board');
    const boardCells = document.querySelectorAll('.board__item');
    const dialog = document.getElementById('my-dialog');
    const p1Score = document.querySelector('.score__value--1');
    const p2Score = document.querySelector('.score__value--2');
    const dialogTitle = document.querySelector('#dialog-header__dialog-title');
    const closeButton = document.querySelector('.close-btn');
    const mainRestartButton = document.querySelector('#restart-btn')
    let p1ScoreCount = 0;
    let p2ScoreCount = 0;

    const clearScreen = (dialogOption = '') => {
        boardGame = GameController();

        boardCells.forEach((boardCell, index) => {
            boardCell.textContent = '';
            boardCell.dataset.cell = index
        });

        if (dialogOption == "restart-button") {
            p1Score.textContent = '0';
            p2Score.textContent = '0';
            p1ScoreCount = 0;
            p2ScoreCount = 0;
            mainRestartButton.style.display = "none";
            isButtonVisible = false;
        }

        if (dialogOption) {
            // Reset turns indicator back to Player 1, if P2 won.
            switchTurns(dialogOption);
        }
    }

    const playRound = (e) => {
        const target = e.target;
        // do nothing if clicked area doesn't have a data cell attribute
        if (!target.dataset.cell || target.textContent !== '') return;

        let winningMessage = '';
        const spanEl = document.createElement('span');
        const player = boardGame.getActivePlayer();
        spanEl.className = 'letter';
        spanEl.textContent = player.symbol;
        target.append(spanEl);

        const result = boardGame.playRound(target.dataset.cell);
        if (!result) {
            if (!isButtonVisible) {
                mainRestartButton.style.display = "block";
                isButtonVisible = true;
            }
            switchTurns();
        } else {
            mainRestartButton.disabled = true;
            switch (result.player.toLowerCase()) {
                case 'draw':
                    winningMessage = `IT'S A DRAW!`
                    break;
                case 'x':
                    winningMessage = 'X Wins!';
                    p1ScoreCount++;
                    p1Score.textContent = p1ScoreCount;
                    document.querySelector('.player--1 .card__letter').classList.add('smooth-blink');
                    break;
                case 'o':
                    winningMessage = 'O Wins!'
                    p2ScoreCount++;
                    p2Score.textContent = p2ScoreCount;
                    document.querySelector('.player--2 .card__letter').classList.add('smooth-blink');
                    break;
                default:
                    break;
            }
            dialogTitle.textContent = winningMessage;
            const wc = result.winningCombination;
            clearBlinkingClassList('add', wc);
            // show dialog after 5 seconds
            setTimeout(function () {
                clearBlinkingClassList('remove', wc);
                document.querySelector('.player--1 .card__letter').classList.remove('smooth-blink');
                document.querySelector('.player--2 .card__letter').classList.remove('smooth-blink');
                mainRestartButton.disabled = false;
                dialog.showModal();
            }, 5000)
        }
    };

    const switchTurns = (dialogOption = '') => {
        if (dialogOption) {
            document.querySelector('.player--2 .turn').classList.add('turn--inactive');
            document.querySelector('.player--1 .turn').classList.remove('turn--inactive');
        } else {
            document.querySelector('.player--2 .turn').classList.toggle('turn--inactive');
            document.querySelector('.player--1 .turn').classList.toggle('turn--inactive');
        }
    };

    const clearBlinkingClassList = (method, winningCombination) => {
        winningCombination.forEach(position => {
            let symbol = document.querySelector(`.board__item--${position}`);
            if (method == 'add') {
                symbol.classList.add('smooth-blink');
            } else {
                symbol.classList.remove('smooth-blink');
            }
        });
    }

    dialogButtons.addEventListener('click', (e) => {
        const target = e.target;

        switch (target.id) {
            case 'continue-button':
                clearScreen(target.id);
                break;
            case 'restart-button':
                clearScreen(target.id);
                break;
            default:
                break;
        }
    });

    board.addEventListener('click', playRound);

    closeButton.addEventListener('click', () => {
        clearScreen('continue-button');
    });

    mainRestartButton.addEventListener('click', () => {
        clearScreen('restart-button');
    })

    clearScreen();
}
ScreenController();
