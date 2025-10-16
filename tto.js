
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

    let activePlayer = players[0];

    let switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    let getActivePlayer = () => {
        activePlayer
    }

    let printNewRound = () => {
        // Create initial board with the default player going first (P1)
    }

    printNewRound();
}